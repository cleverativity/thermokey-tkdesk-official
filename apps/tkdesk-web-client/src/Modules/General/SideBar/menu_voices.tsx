import {
  TeamOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
  FunctionOutlined,
  SolutionOutlined,
  // ShopOutlined,
  DashboardOutlined,
  FileProtectOutlined,
} from '@ant-design/icons'
import { Fan, Selection } from 'Components/Icons'
import { rawPermissions } from 'Model/App/Authorization/constant'

const options: MenuVoice[] = [
  {
    key: 'dashboard',
    label: 'ui.sidebar.dashboard',
    icon: DashboardOutlined,
    permission: rawPermissions.Calculation.create,
  },
  {
    key: 'calculations/edit',
    label: 'ui.sidebar.calculations',
    icon: CalculatorOutlined,
    permission: rawPermissions.Calculation.create,
  },
  {
    key: 'calculations',
    label: 'ui.sidebar.calculations_list',
    icon: SolutionOutlined,
    permission: rawPermissions.Calculation.index,
  },
  {
    key: 'users',
    label: 'ui.sidebar.users',
    icon: TeamOutlined,
    permission: rawPermissions.User.index,
  },
  {
    key: 'selections/edit',
    label: 'ui.sidebar.selections',
    icon: Selection,
    permission: rawPermissions.Selection.create,
  },
  {
    key: 'selections',
    label: 'ui.sidebar.selections.list',
    icon: FileProtectOutlined,
    permission: rawPermissions.Selection.index,
  },
  // {
  //   key: 'orders',
  //   label: 'ui.sidebar.orders',
  //   icon: ShopOutlined,
  //   permission: rawPermissions.Calulation.manage,
  // },
  {
    key: 'settings',
    label: 'ui.sidebar.settings',
    icon: FunctionOutlined,
    permission: rawPermissions.Setting.manage,
    children: [
      {
        key: 'settings/corrective-factors',
        label: 'ui.sidebar.settings.corrective_factors',
        permission: rawPermissions.Setting.manage,
      },
      {
        key: 'settings/refrigerants',
        label: 'ui.sidebar.settings.refrigerants',
        permission: rawPermissions.Setting.manage,
      },
    ],
  },
  {
    key: 'fan-models',
    label: 'ui.sidebar.fan_models',
    icon: Fan,
    permission: rawPermissions.FanModel.manage,
  },
  {
    key: 'development',
    label: 'ui.sidebar.development',
    icon: ExperimentOutlined,
    permission: rawPermissions.Development.index,
    children: [
      {
        external: true,
        key: 'https://www.figma.com/design/wAPtzbQgZAMcCVw4oycpRv/TKCC---Wireframe%2FMockup?node-id=167-7293&t=chprQZ5I6WX850HH-0',
        label: 'ui.sidebar.development.mockup',
        permission: '',
      },
      {
        key: 'development/swagger',
        label: 'ui.sidebar.development.swagger',
        permission: '',
      },
      {
        key: 'development/get-auth',
        label: 'ui.sidebar.development.get_auth',
        permission: '',
      },
    ],
  },
]
export default options
