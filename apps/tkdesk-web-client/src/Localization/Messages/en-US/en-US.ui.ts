export default {
  ui: {
    footer: {
      text: 'Solutions for heat exchange',
      help: 'HELP',
    },
    generic: {
      search: 'Search',
      yes: 'Yes',
      no: 'No',
      true: 'True',
      false: 'False',
      logout: 'Logout',
      profile: 'Go to profile',
      back: 'Back',
      go_back: 'Go back',
      incoming: 'Incoming',
      save: 'Save',
      cancel: 'Cancel',
      next: 'Next',
      complete: 'Complete',
      open: 'Open',
      get_auth: 'Recover Token',
      reset_eula: 'Reset Eula',
      populate_data: 'Populate Data',
      blank: '404',
      blank_description: 'The page you are looking for does not exist',
      blank_button: 'Go back to home',
      error: {
        '': 'Error',
        generic: 'An error has occurred.',
        description: 'We are working to fix it. Try again later',
      },
      invalid_json: 'The content is not valid JSON',
      reload: 'Reload',
      information: 'Informations',
      leave_edit_title: "You're leaveing the page.",
      leave_edit:
        'Are you sure you want to leave the page? The data entered will be lost.',
      codes_not_match: 'The codes are not the same',
      email_invalid_format: 'Invalid format',
      placeholder: 'Select an option',

      model_code: 'Model Code',
      calculate: 'Calculate',
      printPDF: 'Print PDF',
    },
    help: {
      '': 'For any technical issue please contact or support team by email',
      user_guide: 'TK Micro user guide',
      download: 'Download the ',
    },
    login: {
      signin: {
        send: 'Send',
        confirm: 'Confirm',
        back_to_login: 'Back to login',
        request_credentials: 'Request credentials',
        forgot_password: 'Forgot password',
        login_text:
          "Access Thermokey's portal for calculating products with Microchannel technology",
        forgot_password_text:
          'Enter the username whose password you want to recover. The code to be entered will be sent to you by email.',
        confirm_forgot_password_text:
          'Enter the code arrived via email and set a new password.',
        force_new_password_text: 'Enter a new password for your account.',
        password_info:
          'The password must be at least 8 characters long and contain at least one number, at least one special character (e.g. ^ $ * . [ ] { } ( ) ? - " ! @ # % & / , > < \' : ; | _ ~ ` + =), at least one uppercase letter and at least one lowercase letter',
      },
      eula: {
        first_page_title: 'Disclosure 1',
        second_page_title: 'Disclosure 2',
        accept: 'Accept',
        download_1: 'Download Pt. 1',
        download_2: 'Download Pt. 2',
        go_to_second_page: 'Next',
        back_to_first_page: 'Back',
      },
    },
    sidebar: {
      dashboard: 'Dashboard',
      calculations: 'Calculations',
      calculations_list: 'Calculations List',
      users: 'Users',
      selections: {
        '': 'Unit Selection',
        list: 'Unit Selection List',
      },
      orders: 'Orders',
      settings: {
        '': 'Visibilities',
        corrective_factors: 'Corrective Factors',
        refrigerants: 'Refrigerants',
      },
      fan_models: 'Fans',
      development: {
        '': 'Development',
        mockup: 'Mockup',
        swagger: 'Swagger',
        get_auth: 'Auth Token',
      },
      information: 'Informations',
    },
    profile: {
      title: 'Profile',
    },
    dashboard: {
      '': 'Choose your configuration',
      buttons: {
        calculations: 'Core performance calculation',
        ventilations: 'Unit selection configuration',
      },
    },
    users: {
      create_user: 'Create User',
      confirm_creation: 'Create',
      placholder_type: 'Select user type',
      permission: {
        '': 'User Permissions',
        description:
          'If you enable the use case and enter the values, they will replace the default ones',
      },
    },
    coils: {
      microchannel: {
        steps: {
          cleaned_routing: {
            title: 'Do you really want to go back to the first step?',
            description:
              'By clicking on Confirm, you will lose the data entered up to this moment.',
            confirm: 'Confirm',
          },
          use_case: {
            '': 'Use Case',
            air_cooled_condenser: 'Air-cooled condenser',
            water_cooler: 'Liquid cooler',
            water_heater: 'Liquid heater',
            double_flow_rw: 'MSDF - Refrigerant Liquid',
            double_flow_ww: 'MSDF - Liquid Liquid',
            free_cooling_condenser: 'Condenser w. free cooling',
          },
          input_parameters: {
            '': 'Parameters',
            geometric_parameters: {
              '': 'Geometric Parameters',
              c1: 'Free Cooling',
              c2: 'Condenser',
            },
            refrigerant_circuit: {
              '': 'Refrigerant Circuit',
              enable_section:
                'To enable this section, enter a length greater than 0 and select at least one geometry type.',
              geom_type: 'Tube pitch: {pitch}',
            },
            entry_conditions: {
              '': 'Operating Conditions',
              fluid: 'Coolant',
              fluid_c3: 'Air',
              fluid_refrigerant: 'Refrigerant',
              fluid_primary: 'Primary Coolant',
              fluid_secondary: 'Secondary Coolant',
              liquid: 'Liquid',
              enable_section:
                'To enable this section, select at least one geometry type.',
            },
          },
          model_choice: 'Model',
          model_detail: 'Detail',
          back_to_list: '< Calculations List',
        },
        use_case: {
          '': 'Select the desired use case',
          placeholder: 'Select the use case',
          usage: 'Usage and Compatibility',
          features: 'Features',

          air_cooled_condenser: {
            '': 'Air-Cooled Condenser',
            usage_desc:
              'Two-phase microchannel cores are used both in remote condensers and chillers as condensing units. Applications range from HVAC or Process Chillers to Data Centres systems, Rooftop systems, Airside Equipements, Food and Beverage and Industrial Process Equipments. ThermoKey cores, in the various configurations, are compatible with all standard refrigerants up to a maximum working pressure of 45 bar and test pressure of 50 bar.',
            features_desc:
              'For its most demanding customers ThermoKey also provides the D-shape header. The D-shape allows lower pressure drops and it is specifically designed for chiller manufacturers. The advantages are: <ul><li>Better distribution of the refrigerant inside the core</li><li>Lower pressure drops</li><li>Better performance of the core</li></ul>',
          },

          water_cooler: {
            '': 'Liquid Cooler',
            usage_desc:
              'Single phase microchannel cores are used in liquid coolers and chillers (free-cooling). ThermoKey cores, in the various configurations, are compatible with both propylene and ethylene glycols (with minimum glycol + inhibitor concentration of 35% to avoid effects of corrosion) and up to a maximum working pressure of 15 bar.',
            features_desc:
              'ThermoKey has developed dedicated MPE and manifold for liquid coolers with the aim of achieving very low pressure drops. The cores are fitted with easy-to-use Victaulic fittings. TKMicro H2O with high water flow is comparable to a round tube coil with 4 rows.',
          },
          water_heater: {
            '': 'Liquid Heater',
            usage_desc:
              'Single phase microchannel cores are used for cooling liquids or air. ThermoKey cores, in the various configurations, are compatible with both propylene and ethylene glycols (with minimum glycol + inhibitor concentration of 35% to avoid effects of corrosion) and up to a maximum working pressure of 15 bar.',
            features_desc:
              'ThermoKey has developed dedicated MPE and manifold for liquid coolers with the aim of achieving very low pressure drops. The cores are fitted with easy-to-use Victaulic fittings. TKMicro H2O with high water flow is comparable to a round tube coil with 4 rows.',
          },

          double_flow: {
            '': 'Multi System Dual Flow (MSDF)',
            usage_desc:
              'The MSDF is a special microchannel heat exchanger that has two circuits within the multi-port tubes. A coolant is introduced for adiabatic effect and heat recovery. This improves the performance of heat exchangers while creating a warm source of thermal energy available for many applications, such as evaporator defrosting.',
          },
        },
        model_list: {
          '': 'Select the desired result',
        },
        model_detail: {
          results_c1: 'C1 results',
          results_c3: 'C3 results',
          temperature: 'Temperature',
          title: 'Title',

          general_info: 'General Information',
          air_side: 'Air Side',
          refrigerant_side: 'Refrigerant Side',
          fluid_side: 'Coolant Side',
          fan_model_side: 'Fan Model Side',

          geometric_details: {
            '': 'Geometric Details',
            measures: 'Measures',
            other_params: 'Other Parameters',
            legend: 'Legend',
            value: 'Value',
            field: 'Field',
          },
          coil_image: 'Core Schema',
          download: 'Download PDF',
          generate_pdf: 'Regenerate pdf',
        },
      },
    },
    selections: {
      offer: 'Generate Quote',
      datasheet: 'Generate Data Sheet',
      steps: {
        macro_series: {
          '': 'Macro-series',
          description: 'Select the desired macro-series',
          placeholder: 'Select the macro-series',
        },
        input_parameters: {
          '': 'Parameters',
          performance: 'Performance',
          air: 'Air',
          liquid: 'Liquid',
          coil: 'Heat Exchanger',
          dimensions: 'Type and Dimensions',
          noise: 'Noise',
          fans: 'Fans',
        },
        model_choice: 'Model',
        model_list: {
          '': 'Select the models you want to compare',
          entry_conditions: 'Entry Conditions',
        },
        model_detail: {
          '': 'Detail',
          unit_data: 'Unit Data',
          accessories: 'Accessories',
          image: 'Image',
        },
      },
      tabs: {
        design: 'Design',
        rating: 'Rating',
        detail: 'Detail',
        wp: 'Working Point',
        ea: 'Energy Analysis',
        calculations_results: 'Calculations Results',
      },
    },
    order: {
      create_order: 'Create Order',
    },
    settings: {
      corrective_factors: {
        '': 'Corrective Factors',
        label: 'Active Corrective Factors for the selected user.',
        override:
          'Changing the following factors will lead to overriding the default factors',
        edit: 'Edit',
        complete: 'Save Changes',
        tab: { calculations: 'MCHX', selections: 'Units' },
        fields: {
          global_heat_flux_c1: 'Global Heat Flux',
          ad_pressure_drops_air: 'Pressure Drops Air',
          pressure_drops_air: 'Pressure Drops Air',
          air_inlet_temperature_decrease: 'Air Inlet Temperature Decrease [K]',
          capacity_increase_perc: 'Capacity Increase Percentage [%]',
          connection_limit_speed: 'Connection Limit Speed [m/s]',
          sound_power_correction: 'Sound Power Correction [dB(A)]',
        },
      },
    },
    fan_models: {
      create: { '': 'Create Fan Model', import: 'Import Fan Models' },
      fan_model: 'Fan Model',
      modal: {
        button: 'Fan',
        title: 'Fan Management',
      },
      placholder_phase_type: 'Select phase type',
      placholder_visibility: 'Select visibility',
      placholder_fan_type: 'Select fan type',
      placholder_link: 'Select operating mode',
      polynomial: {
        create: 'Add values',
        add: 'Add coefficient',
        edit: 'Edit values',
        polynomial_type: 'Polynomial type',
        placholder_polynomial_type: 'Select polynomial type',
      },
    },
    thermal: {
      steps: {
        parameters: 'Cardano Parameters',
        results: 'Results',
        performance: 'Performance',
      },
      panelHeader: {
        //Step2
        performance: 'Performance',
        air: 'Air',
        fluid: 'Fluid',
        dimensions: 'Dimensions',
        fans: 'Fans',
        noise: 'Noise',
        //Step3
        condenser: 'Condenser',
        remote_condenser: 'Remote Condenser',
        inlet_outlet: 'Inlets / Outlets',
        fan_technical_data: 'Fans',
        geometric_params: 'Geometric Parameters',
        accessories: 'Accessories',
        adjustment_modules: 'Adjustment Modules',
        energy_analysis: 'Energy Analysis',
        rating_performance_target: 'Performance Target',
        rating_air: 'Air',
        rating_liquid: 'Fluid',
        rating_ventilation: 'Ventilation',
        rating_noise: 'Noise',
        rating_unit_filter: 'Unit Filter',
        rating_ventilation_filter: 'Ventilation Filter',
        rating_coil_filter: 'Coil Filter',
        rating_calculations_results: 'Calculations Results',
        rating_performance_data: 'Performance Data',
        rating_air_data: 'Air Data',
        rating_liquid_data: 'Refrigerant Data',
        rating_unit_data: 'Unit Data',
        rating_noise_data: 'Noise Data',
        rating_coil_data: 'Coil Data',
        rating_ventilation_data: 'Ventilation Data',
        working_point_speed: 'Speed',
        working_point_air: 'Air',
        working_point_liquid: 'Refrigerant',
        working_ventilation: 'Ventilation',
      },
      tab_value: {
        si: 'SI (Metric) Results',
        ip: 'I-P (English) Results',
        ac: 'Adjust Capacity',
        aff: 'Adjust Fan Flows',
      },

      tabs: {
        ea: 'Energy Analysis',
        perf: 'Performance',
        design: 'Design',
        rating: 'Rating',
        si: 'SI (Metric)',
        ip: 'I-P (English)',
      },
      button: {
        generate_pdf: 'Download PDF',
        energy_analysis: 'Energy Analysis',
        accessories: 'Accessories',
      },
      modal: {
        title: {
          energy_analysis: 'Energy Analysis',
          accessories: 'Accessories',
          adjust_fan_flows: 'Adjust Fan Flows',
        },
      },

      columns: {
        value: 'Value',
        field: 'Field',
        um: 'U.M.',
      },
    },
  },
}
