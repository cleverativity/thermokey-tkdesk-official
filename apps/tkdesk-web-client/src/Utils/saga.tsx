import { ConsoleLogger } from 'aws-amplify/utils'
import * as R from 'ramda'
import { call } from 'redux-saga/effects'

const log = new ConsoleLogger('Utils/saga')

/**
 * This function combine sequence of sagas into an unique saga, like a pipe
 * @sign (Saga (x_1, ... x_n) a, Saga a y_1, ... , Saga y_{m-1} y_{m} ) -> Saga (x_1, ... x_n) y_{m}
 */
export function pipeSaga(...sagas: any[]) {
  const [f, ...fs] = sagas

  return function* pipedSagas(...args: any[]): any {
    let x: any = yield call(f, ...args)

    for (let index = 0; index < fs.length; index += 1) {
      const g = fs[index]
      x = yield call(g, x)
    }

    return x
  }
}

/**
 * This function returns a saga that apply the given saga to portion of the argument object
 * @sign Lens s a -> Saga a a -> Saga s s
 */
export function overSaga(lens: any, saga: any): any {
  return function* overedSaga(obj: any): any {
    const arg = R.view(lens, obj)

    const result = yield call(saga, arg)

    return R.set(lens, result, obj)
  }
}

/**
 * This function is used to easly enrich a list of objects, with data from different sources
 *
 * Tipically we have two objects A and B, the object A
 * contains one or more objects of type B.
 *
 * And those objects are stored in different microservices
 * such that we cannot retrive both ojects with the same
 * call to the server and.
 *
 * This problem is solved with a first call to fetch all
 * the needed A's objects, and then with the information in
 * te A's we fetch all the needed B's, this login is very common
 * and is implemented in generator creator.
 *
 * This function ceate an enricher for a data A that
 * has to be eriched of values B
 *
 * After the fecthing of all the A objects that passed
 * to the resulted enricher funciton.
 *
 * The function first harvest all the B ids/code from
 * all A with `codesExtractor`, the code must be a
 * String.
 *
 *    codesExtractor :: A -> [BCode]
 *
 * Then harvest the needed B's with `searchSaga` that expect
 * to return an object with a `datas` key with an array of B's
 *
 *    searchSaga :: Params -*> {datas: [B]}
 *
 * The funciton `dataEnricher` has to enrich the A object
 * with the 'look' function.
 *
 * The `look` function that is passed to `dataEnricher`,
 * and is used to retrive a B object from a BID, which is the
 * type of data in A to represent a reference to a B object.
 *
 *    dataEnricher :: (BID -> B) -> A -> A
 *    look :: BID -> B
 *
 * The custome enricher needs two other functions to know
 * how to convert and find B objects.
 *
 * The `getObjectCode` function gets the B object code, that
 * has to be a string, because is usend to distinguish between
 * all the other B's
 *
 *    getObjectCode :: B -> BCode
 *
 * The `getDataCode` function is used to get the B object code,
 * from the A representation of B
 *
 *    getDataCode   :: BID -> BCode
 *
 * The `name` String is used for logging meaningfull errors and
 * informations, tipically the string is the name of the two
 * objects contcatenated
 *    name :: String = "AB"
 *
 * @param {Object} config
 * @param {a -> [BCode]} config.codesExtractor
 * @param {(BID -> b) -> a -> a} config.dataEnricher
 * @param {Saga Params {datas: [b]}} config.searchSaga
 * @param {B -> BCode} config.getObjectCode
 * @param {BID -> BCode=R.identity} config.getDataCode
 * @param {String} config.name
 * @return {Funtion* a a}
 * @sign EnricherConfig -> [a] -*> [a]
 */
export const createEnricher = (params: any) => {
  const {
    codesExtractor,
    dataEnricher,
    searchSaga,
    getObjectCode,
    getDataCode = R.identity,
    name,
  } = params

  const enricher = function* createdEnricher(datas: any) {
    log.debug(`genericEnricherOf${name}.data`, datas)

    if (!R.is(Array, datas) || R.isEmpty(datas)) {
      // no need to enrich no datas
      return datas
    }

    log.debug(`genericEnricherOf${name}.codesExtractor`, codesExtractor)
    // gathering all the coded in the data
    const codes = R.pipe(
      R.map(codesExtractor),
      R.reduce<any, any>(R.concat, []),
      // TODO log that some keys are undefined or null
      // maybe in the future we could throw an error.
      R.reject<any>(R.isNil),
      R.uniq
    )(datas)

    // api call for gathering al the objects
    log.debug(`genericEnricherOf${name}.codes`, codes)
    if (R.isEmpty(codes)) {
      // no need to search no objects
      return datas
    }

    const { datas: objects } = yield call(searchSaga, {
      codes,
      pagination: { pageSize: codes.length },
    })

    log.debug(`genericEnricherOf${name}.objects`, objects)
    const objectsMap = R.pipe(
      R.map<any, any>((object) => [getObjectCode(object), object]),
      R.fromPairs
    )(objects)
    log.debug(`genericEnricherOf${name}.objectsMap`, objectsMap)

    const look = R.cond([
      [R.isNil, R.always(null)],
      [R.T, (data) => R.propOr(data, getDataCode(data), objectsMap)],
    ])

    log.debug(`genericEnricherOf${name}.lookup`, {
      lookup: objectsMap,
      length: R.keys(objectsMap).length,
    })

    // map over the douments to enrich every document with his subjects
    log.debug(`genericEnricherOf${name}.data`, datas)
    const enrichedDatas = R.map(dataEnricher(look), datas)

    log.debug(`genericEnricherOf${name}.enrichedData`, enrichedDatas)
    return enrichedDatas
  }

  enricher.codesExtractor = codesExtractor
  enricher.dataEnricher = dataEnricher
  enricher.searchSaga = searchSaga
  enricher.getObjectCode = getObjectCode
  enricher.getDataCode = getDataCode

  return enricher
}
