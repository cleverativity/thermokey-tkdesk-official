export default {
  ui: {
    footer: {
      text: 'Soluzioni per lo scambio termico',
      help: 'SUPPORTO',
    },
    generic: {
      search: 'Cerca',
      yes: 'Sì',
      no: 'No',
      true: 'Vero',
      false: 'Falso',
      logout: 'Logout',
      profile: 'Vai al profilo',
      back: 'Indietro',
      go_back: 'Indietro',
      incoming: 'In arrivo',
      save: 'Salva',
      cancel: 'Annulla',
      next: 'Avanti',
      complete: 'Completa',
      open: 'Apri',
      get_auth: 'Recupera Token',
      reset_eula: 'Reset Eula',
      populate_data: 'Popola Dati',
      blank: '404',
      blank_description: 'La pagina che stai cercando non esiste',
      blank_button: 'Torna alla home',
      error: {
        '': 'Errore',
        generic: 'Si è verificato un errore.',
        description: 'Stiamo lavorando per risolverlo. Riprova più tardi',
      },
      invalid_json: 'Il contenuto non è un JSON valido',
      reload: 'Ricarica',
      information: 'Informazioni',
      leave_edit_title: 'Stai lasciando la pagina',
      leave_edit:
        'Sei sicuro di voler abbandonare la pagina? I dati inseriti andranno persi.',
      codes_not_match: 'I codici non sono uguali.',
      email_invalid_format: 'Formato non valido',
      placeholder: 'Seleziona un opzione',

      model_code: 'Codice Modello',
      calculate: 'Calcola',
      printPDF: 'Stampa PDF',
    },
    help: {
      '': 'Per qualsiasi problema tecnico contattare direttamente la mail di supporto',
      user_guide: 'TK Micro guida utente',
      download: 'Scarica la ',
    },
    login: {
      signin: {
        send: 'Invia',
        confirm: 'Conferma',
        back_to_login: 'Torna al login',
        request_credentials: 'Richiedi Credenziali',
        forgot_password: 'Password dimenticata',
        login_text:
          'Accedi al portale per il calcolo di prodotti con tecnologia a Microcanale di Thermokey',
        forgot_password_text:
          "Inserisci l'username di cui vuoi recuperare la password. Ti verrà inviato il codice da inserire tramite email.",
        confirm_forgot_password_text:
          'Inserisci il codice arrivato tramite email e imposta una nuova password.',
        force_new_password_text:
          'Inserisci una nuova password per il tuo account.',
        password_info:
          'La password deve essere lunga almeno 8 caratteri e contenere almeno un numero, almeno un carattere speciale (es: ^ $ * . [ ] { } ( ) ? - " ! @ # % & /  , > < \' : ; | _ ~ ` + =), almeno una lettera maiuscola e almeno una lettera minuscola',
      },
      eula: {
        first_page_title: 'Informativa 1',
        second_page_title: 'Informativa 2',
        accept: 'Accetta',
        download_1: 'Scarica Pt. 1',
        download_2: 'Scarica Pt. 2',
        go_to_second_page: 'Avanti',
        back_to_first_page: 'Indietro',
      },
    },
    sidebar: {
      dashboard: 'Dashboard',
      calculations: 'Calcolo',
      calculations_list: 'Lista Calcoli',
      users: 'Utenti',
      selections: { '': 'Unità Ventilate', list: 'Lista Unità Ventilate' },
      orders: 'Ordini',
      settings: {
        '': 'Visibilità',
        corrective_factors: 'Fattori Correttivi',
        refrigerants: 'Refrigeranti',
      },
      fan_models: 'Ventilatori',
      development: {
        '': 'Development',
        mockup: 'Mockup',
        swagger: 'Swagger',
        get_auth: 'Auth Token',
      },
      information: 'Informazioni',
    },
    profile: {
      title: 'Profilo',
    },
    dashboard: {
      '': 'Scegli la tua configurazione',
      buttons: {
        calculations: 'Calcolo prestazioni batterie',
        ventilations: 'Configurazione unità ventilate',
      },
    },
    users: {
      create_user: 'Crea utente',
      confirm_creation: 'Crea',
      placholder_type: 'Selezione tipologia utente',
      permission: {
        '': 'Permessi Utente',
        description:
          "Se si abilita il caso d'uso e si inseriscono i valori, questi andranno a sostituire quelli di default",
      },
    },
    coils: {
      microchannel: {
        steps: {
          cleaned_routing: {
            title: 'Vuoi davvero tornare al primo step?',
            description:
              'Cliccando su Conferma, perderai i dati inseriti fino a questo momento.',
            confirm: 'Conferma',
          },
          use_case: {
            '': 'Applicazione',
            air_cooled_condenser: 'Air-cooled condenser',
            water_cooler: 'Liquid cooler',
            water_heater: 'Liquid heater',
            double_flow_rw: 'MSDF - Refrigerante Liquido',
            double_flow_ww: 'MSDF - Liquido Liquido',
            free_cooling_condenser: 'Condenser w. free cooling',
          },
          input_parameters: {
            '': 'Parametri',
            geometric_parameters: {
              '': 'Parametri geometrici',
              c1: 'Free Cooling',
              c2: 'Condenser',
            },
            refrigerant_circuit: {
              '': 'Circuito refrigerante',
              enable_section:
                'Per abilitare questa sezione, inserisci una lunghezza superiore a 0 e seleziona almeno un tipo di geometria.',
              geom_type: 'Passo tubi: {pitch}',
            },
            entry_conditions: {
              '': 'Condizioni di funzionamento',
              fluid: 'Fluido',
              fluid_c3: 'Aria',
              fluid_refrigerant: 'Refrigerante',
              fluid_primary: 'Fluido Primario',
              fluid_secondary: 'Fluido Secondario',
              liquid: 'Liquido',
              enable_section:
                'Per abilitare questa sezione, seleziona almeno un tipo di geometria.',
            },
          },
          model_choice: 'Modello',
          model_detail: 'Dettaglio',
          back_to_list: '< Lista Calcoli',
        },
        use_case: {
          '': "Seleziona l'applicazione d'uso desiderata",
          placeholder: "Selezione applicazione d'uso",
          usage: 'Utilizzo e Compatibilità',
          features: 'Caratteristiche',

          air_cooled_condenser: {
            '': 'Air-Cooled Condenser',
            usage_desc:
              'Le batterie microcanale bi-fase sono utilizzate sia nei condensatori remoti che nei refrigeratori come unità di condensazione. Le applicazioni variano da refrigeratori HVAC o di di processo, sistemi Data Center, sistemi Rooftop, apparecchiature Airside, apparecchiature per processi industriali e per prodotti alimentari. Le batterie ThermoKey, nelle varie configurazioni, sono compatibili con tutti i refrigeranti standard, fino a pressioni massime di esercizio di 45 bar e pressione di prova di 50 bar.',
            features_desc:
              'Per i suoi clienti più esigenti, ThermoKey fornisce anche il collettore a D. La forma a D permette predite di pressione più basse ed è progettata specificamente per i produttori di chiller. I vantaggi sono: <ul><li>Migliore distribuzione del refrigerante all’interno della batteria</li><li>Minori perdite di pressione</li><li>Migliori prestazioni</li></ul>',
          },

          water_cooler: {
            '': 'Liquid Cooler',
            usage_desc:
              'Le batterie microcanale monofase sono utilizzate nei raffreddatori liquidi e refrigeratori (free-cooling). Le batterie ThermoKey, nelle varie configurazioni, sono compatibili con entrambi glicoli propolenici e etilenici (con concentrazione di glicole+inibitore minima del 35% per evitare effetti di corrosione) e fino a pressioni massime di esercizio di 15 bar.',
            features_desc:
              'ThermoKey ha sviluppato un MPE ed un collettore dedicato al raffreddatore di liquidi con l’obiettivo di raggiungere perdite di pressione molto basse (lato liquido). Le batterie sono dotate di attacchi Victaulic di facile utilizzo. TKMicro H2O con elevata portata d’acqua è paragonabile ad una batteria tubo tondo con 4 ranghi.',
          },
          water_heater: {
            '': 'Liquid Heater',
            usage_desc:
              'Le batterie microcanale monofase sono utilizzate come raffreddatori di liquidi o dell’aria. Le batterie ThermoKey, nelle varie configurazioni, sono compatibili con entrambi glicoli propolenici e etilenici (con concentrazione di glicole+inibitore minima del 35% per evitare effetti di corrosione) e fino a pressioni massime di esercizio di 15 bar.',
            features_desc:
              'ThermoKey ha sviluppato un MPE ed un collettore dedicato al raffreddatore di liquidi con l’obiettivo di raggiungere perdite di pressione molto basse (lato liquido). Le batterie sono dotate di attacchi Victaulic di facile utilizzo. TKMicro H2O con elevata portata d’acqua è paragonabile ad una batteria tubo tondo con 4 ranghi.',
          },

          double_flow: {
            '': 'Multi System Dual Flow (MSDF)',
            usage_desc:
              'L’MSDF è uno speciale scambiatore di calore a microcanali che dispone di due circuiti all’interno dei tubi multiporta. Viene introdotto un refrigerante per effetto adiabatica e recupero di calore. Questo migliora le prestazioni degli scambiatori di calore e genera una fonte di energia termica utile per molte applicazioni, come lo sbrinamento degli evaporatori.',
          },
        },
        model_list: {
          '': 'Seleziona il risultato desiderato',
        },
        model_detail: {
          results_c1: 'Risultati C1',
          results_c3: 'Risultati C3',
          temperature: 'Temperatura',
          title: 'Titolo',

          general_info: 'Informazioni Generali',
          air_side: 'Lato Aria',
          refrigerant_side: 'Lato refrigerante',
          fluid_side: 'Lato Fluido',
          fan_model_side: 'Lato Ventilatore',

          geometric_details: {
            '': 'Dettagli geometrici',
            measures: 'Misure',
            other_params: 'Altri Parametri',
            legend: 'Legenda',
            value: 'Valore',
            field: 'Campo',
          },
          coil_image: 'Schema Batteria',
          download: 'Download PDF',
          generate_pdf: 'Rigenera pdf',
        },
      },
    },
    selections: {
      offer: 'Genera offerta',
      datasheet: 'Genera scheda tecnica',
      steps: {
        macro_series: {
          '': 'Macro-serie',
          description: 'Seleziona la macro-serie desiderata',
          placeholder: 'Seleziona la macro-serie',
        },
        input_parameters: {
          '': 'Parametri',
          performance: 'Performance',
          air: 'Aria',
          liquid: 'Fluido',
          coil: 'Scambiatore di calore',
          dimensions: 'Tipo e dimensioni',
          noise: 'Rumore',
          fans: 'Ventilatori',
        },
        model_choice: 'Modello',
        model_list: {
          '': 'Seleziona i modelli che vuoi confrontare',
          entry_conditions: 'Condizioni di funzionamento',
        },
        model_detail: {
          '': 'Dettaglio',
          unit_data: 'Dati Unità',
          accessories: 'Accessori',
          image: 'Immagine',
        },
      },
      tabs: {
        design: 'Modalità Progettazione',
        rating: 'Modalità Valutazione',
        detail: 'Dettagli',
        wp: 'Punto di Funzionamento',
        ea: 'Analisi Energetica',
        calculations_results: 'Risultati dei calcoli',
      },
    },
    order: {
      create_order: 'Crea ordine',
    },
    settings: {
      corrective_factors: {
        '': 'Fattori Correttivi',
        label: "Fattori correttivi attivi per l'utente selezionato.",
        override:
          'La modifica dei seguenti fattori, porterà a una sovrascrittura dei fattori di default',
        edit: 'Modifica',
        complete: 'Salva Modifiche',
        tab: { calculations: 'MCHX', selections: 'Unità' },
        fields: {
          global_heat_flux_c1: 'Flusso Termico',
          ad_pressure_drops_air: 'Perdite di pressione Aria',
          pressure_drops_air: 'Perdite di pressione Aria',
          air_inlet_temperature_decrease:
            "Diminuzione della temperatura dell'aria in ingresso [K]",
          capacity_increase_perc: 'Percentuale di aumento della capacità [%]',
          connection_limit_speed: 'Velocità limite di connessione [m/s]',
          sound_power_correction: 'Correzione della potenza sonora [dB(A)]',
        },
      },
    },
    fan_models: {
      create: {
        '': 'Crea ventilatore',
        import: 'Importa modelli di ventilatore',
      },
      fan_model: 'Modello Ventilatore',
      modal: {
        button: 'Fan',
        title: 'Gestione Ventilatori',
      },
      placholder_phase_type: 'Seleziona tipologia fase',
      placholder_visibility: 'Seleziona visibilità',
      placholder_fan_type: 'Seleziona tipologia ventilatore',
      placholder_link: 'Seleziona modalità di funzonamento',
      polynomial: {
        create: 'Aggiungi dati',
        add: 'Aggiungi coefficiente',
        edit: 'Modifica dati',
        polynomial_type: 'Tipologia',
        placholder_polynomial_type: 'Seleziona tipologia',
      },
    },
    thermal: {
      steps: {
        parameters: 'Parametri Cardano',
        results: 'Risultati',
        performance: 'Prestazioni',
      },
      panelHeader: {
        //Step2
        performance: 'Prestazioni',
        air: 'Aria',
        fluid: 'Fluido',
        dimensions: 'Dimensioni',
        fans: 'Ventole',
        noise: 'Rumore',

        //Step3
        condenser: 'Condensatore',
        remote_condenser: 'Condensatore remoto',
        inlet_outlet: 'Ingressi / Uscite',
        fan_technical_data: 'Ventole',
        geometric_params: 'Parametri geometrici',
        accessories: 'Accessori',
        adjustment_modules: 'Moduli di regolazione',
        energy_analysis: 'Analisi energetica',
        rating_ventilation_filter: 'Filtro di ventilazione',
        rating_coil_filter: 'Filtro della batteria',
        rating_unit_filter: "Filtro dell'unità",
        rating_performance_target: 'Obiettivo delle prestazioni',
        rating_air: 'Aria',
        rating_liquid: 'Fluido',
        rating_ventilation: 'Ventilazione',
        rating_noise: 'Rumore',
        rating_calculations_results: 'Risultati dei calcoli',
        rating_performance_data: 'Dati di prestazione',
        rating_air_data: "Dati dell'aria",
        rating_liquid_data: 'Dati del refrigerante',
        rating_unit_data: "Dati dell'unità",
        rating_noise_data: 'Dati acustici',
        rating_coil_data: 'Dati della batteria',
        rating_ventilation_data: 'Dati di ventilazione',
        working_point_speed: 'Velocità',
        working_point_air: 'Aria',
        working_point_liquid: 'Refrigerante',
        working_ventilation: 'Ventilazione',
      },
      tab_value: {
        si: 'Risultati SI (Metrici)',
        ip: 'Risultati I-P (Imperiali)',
        ac: 'Regola capacità',
        aff: 'Regola flussi della ventola',
      },
      tabs: {
        si: 'SI (Metrici)',
        ip: 'I-P (Imperiali)',
        design: 'Modalità Progettazione',
        rating: 'Modalità Valutazione',
        ea: 'Analisi Energetica',
        perf: 'Prestazioni',
      },
      button: {
        generate_pdf: 'Scarica PDF',
        energy_analysis: 'Analisi Energetica',
        accessories: 'Accessori',
      },
      modal: {
        title: {
          adjust_fan_flows: 'Adjust Fan Flows',
          energy_analysis: 'Analisi Energetica',
          accessories: 'Accessori',
        },
      },
      columns: {
        value: 'Valore',
        field: 'Campo',
        um: 'UM',
      },
    },
  },
}
