import { useMemo } from "react";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { Tooltip } from "antd";

import { Span } from "Components/Span";
import { StyledTable } from "Components/Styled";

const staticColumns = [
  {
    title: <FormattedMessage id="data.selections.model_detail.code" />,
    dataIndex: "groupId",
    render: (code: string) => <Span value={code} />,
  },
  {
    title: <FormattedMessage id="data.selections.model_detail.description" />,
    dataIndex: "groupName",
    render: (value: string) => <Span value={value} />,
  },
];

const ExpandedTable = ({
  record,
  index,
  selectedIds,
  disabledIds,
  toggleAccessory,
}: any) => {
  const intl = useIntl();

  const data = _.get(record, "items", []);

  const columns = useMemo(
    () => [
      {
        dataIndex: "id",
        render: (id: string) => <Span value={id} />,
      },
      {
        dataIndex: "item",
        render: (code: string) => <Span value={code} />,
      },
    ],
    [disabledIds, index],
  );

  const components = useMemo(
    () => ({
      body: {
        row: (props) => {
          const rowKey = _.get(props, "data-row-key", null);
          const isDisabled = _.includes(disabledIds, rowKey);
          const item = _.find(data, (e) => _.get(e, "id") === rowKey);

          const isMandatory = _.get(item, "validations.isMandatory", false);
          const fatherAccessoryIds = _.get(
            item,
            "validations.fatherAccessoryIds",
            [],
          );

          const fatherAccessoryIdsFormatted = intl.formatList(
            fatherAccessoryIds,
            { type: "conjunction" },
          );

          return isDisabled ? (
            <Tooltip
              placement="topLeft"
              title={intl.formatMessage(
                {
                  id: isMandatory
                    ? "data.selections.model_detail.is_mandatory"
                    : "data.selections.model_detail.disabled",
                },
                { number: fatherAccessoryIdsFormatted },
              )}
            >
              <tr {...props} />
            </Tooltip>
          ) : (
            <tr {...props} />
          );
        },
      },
    }),
    [disabledIds, data, intl],
  );

  return (
    <StyledTable
      showHeader={false}
      loading={false}
      rowKey={(record: any) => _.get(record, "id", "")}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowSelection={{
        hideSelectAll: true,
        selectedRowKeys: selectedIds,
        onSelect: (item) => {
          toggleAccessory(item.id);
        },
        getCheckboxProps: (item) => ({
          disabled: _.includes(disabledIds, _.get(item, "id", "")),
        }),
      }}
      rowClassName={(item) =>
        _.includes(disabledIds, _.get(item, "id", "")) ? "disabled-row" : ""
      }
      components={components}
    />
  );
};

export { staticColumns, ExpandedTable };
