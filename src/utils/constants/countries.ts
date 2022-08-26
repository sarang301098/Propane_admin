const countries = [
  {
    name: "Afghanistan",
    country_code: "+93",
    code: "AF",
  },
  {
    name: "Aland Islands",
    country_code: "+358",
    code: "AX",
  },
  {
    name: "Albania",
    country_code: "+355",
    code: "AL",
  },
  {
    name: "Algeria",
    country_code: "+213",
    code: "DZ",
  },
  {
    name: "AmericanSamoa",
    country_code: "+1684",
    code: "AS",
  },
  {
    name: "Andorra",
    country_code: "+376",
    code: "AD",
  },
  {
    name: "Angola",
    country_code: "+244",
    code: "AO",
  },
  {
    name: "Anguilla",
    country_code: "+1264",
    code: "AI",
  },
  {
    name: "Antarctica",
    country_code: "+672",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    country_code: "+1268",
    code: "AG",
  },
  {
    name: "Argentina",
    country_code: "+54",
    code: "AR",
  },
  {
    name: "Armenia",
    country_code: "+374",
    code: "AM",
  },
  {
    name: "Aruba",
    country_code: "+297",
    code: "AW",
  },
  {
    name: "Australia",
    country_code: "+61",
    code: "AU",
  },
  {
    name: "Austria",
    country_code: "+43",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    country_code: "+994",
    code: "AZ",
  },
  {
    name: "Bahamas",
    country_code: "+1242",
    code: "BS",
  },
  {
    name: "Bahrain",
    country_code: "+973",
    code: "BH",
  },
  {
    name: "Bangladesh",
    country_code: "+880",
    code: "BD",
  },
  {
    name: "Barbados",
    country_code: "+1246",
    code: "BB",
  },
  {
    name: "Belarus",
    country_code: "+375",
    code: "BY",
  },
  {
    name: "Belgium",
    country_code: "+32",
    code: "BE",
  },
  {
    name: "Belize",
    country_code: "+501",
    code: "BZ",
  },
  {
    name: "Benin",
    country_code: "+229",
    code: "BJ",
  },
  {
    name: "Bermuda",
    country_code: "+1441",
    code: "BM",
  },
  {
    name: "Bhutan",
    country_code: "+975",
    code: "BT",
  },
  {
    name: "Bolivia, Plurinational State of",
    country_code: "+591",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    country_code: "+387",
    code: "BA",
  },
  {
    name: "Botswana",
    country_code: "+267",
    code: "BW",
  },
  {
    name: "Brazil",
    country_code: "+55",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    country_code: "+246",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    country_code: "+673",
    code: "BN",
  },
  {
    name: "Bulgaria",
    country_code: "+359",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    country_code: "+226",
    code: "BF",
  },
  {
    name: "Burundi",
    country_code: "+257",
    code: "BI",
  },
  {
    name: "Cambodia",
    country_code: "+855",
    code: "KH",
  },
  {
    name: "Cameroon",
    country_code: "+237",
    code: "CM",
  },
  {
    name: "Canada",
    country_code: "+1",
    code: "CA",
  },
  {
    name: "Cape Verde",
    country_code: "+238",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    country_code: "+ 345",
    code: "KY",
  },
  {
    name: "Central African Republic",
    country_code: "+236",
    code: "CF",
  },
  {
    name: "Chad",
    country_code: "+235",
    code: "TD",
  },
  {
    name: "Chile",
    country_code: "+56",
    code: "CL",
  },
  {
    name: "China",
    country_code: "+86",
    code: "CN",
  },
  {
    name: "Christmas Island",
    country_code: "+61",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    country_code: "+61",
    code: "CC",
  },
  {
    name: "Colombia",
    country_code: "+57",
    code: "CO",
  },
  {
    name: "Comoros",
    country_code: "+269",
    code: "KM",
  },
  {
    name: "Congo",
    country_code: "+242",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    country_code: "+243",
    code: "CD",
  },
  {
    name: "Cook Islands",
    country_code: "+682",
    code: "CK",
  },
  {
    name: "Costa Rica",
    country_code: "+506",
    code: "CR",
  },
  {
    name: "Cote d'Ivoire",
    country_code: "+225",
    code: "CI",
  },
  {
    name: "Croatia",
    country_code: "+385",
    code: "HR",
  },
  {
    name: "Cuba",
    country_code: "+53",
    code: "CU",
  },
  {
    name: "Cyprus",
    country_code: "+357",
    code: "CY",
  },
  {
    name: "Czech Republic",
    country_code: "+420",
    code: "CZ",
  },
  {
    name: "Denmark",
    country_code: "+45",
    code: "DK",
  },
  {
    name: "Djibouti",
    country_code: "+253",
    code: "DJ",
  },
  {
    name: "Dominica",
    country_code: "+1767",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    country_code: "+1849",
    code: "DO",
  },
  {
    name: "Ecuador",
    country_code: "+593",
    code: "EC",
  },
  {
    name: "Egypt",
    country_code: "+20",
    code: "EG",
  },
  {
    name: "El Salvador",
    country_code: "+503",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    country_code: "+240",
    code: "GQ",
  },
  {
    name: "Eritrea",
    country_code: "+291",
    code: "ER",
  },
  {
    name: "Estonia",
    country_code: "+372",
    code: "EE",
  },
  {
    name: "Ethiopia",
    country_code: "+251",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    country_code: "+500",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    country_code: "+298",
    code: "FO",
  },
  {
    name: "Fiji",
    country_code: "+679",
    code: "FJ",
  },
  {
    name: "Finland",
    country_code: "+358",
    code: "FI",
  },
  {
    name: "France",
    country_code: "+33",
    code: "FR",
  },
  {
    name: "French Guiana",
    country_code: "+594",
    code: "GF",
  },
  {
    name: "French Polynesia",
    country_code: "+689",
    code: "PF",
  },
  {
    name: "Gabon",
    country_code: "+241",
    code: "GA",
  },
  {
    name: "Gambia",
    country_code: "+220",
    code: "GM",
  },
  {
    name: "Georgia",
    country_code: "+995",
    code: "GE",
  },
  {
    name: "Germany",
    country_code: "+49",
    code: "DE",
  },
  {
    name: "Ghana",
    country_code: "+233",
    code: "GH",
  },
  {
    name: "Gibraltar",
    country_code: "+350",
    code: "GI",
  },
  {
    name: "Greece",
    country_code: "+30",
    code: "GR",
  },
  {
    name: "Greenland",
    country_code: "+299",
    code: "GL",
  },
  {
    name: "Grenada",
    country_code: "+1473",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    country_code: "+590",
    code: "GP",
  },
  {
    name: "Guam",
    country_code: "+1671",
    code: "GU",
  },
  {
    name: "Guatemala",
    country_code: "+502",
    code: "GT",
  },
  {
    name: "Guernsey",
    country_code: "+44",
    code: "GG",
  },
  {
    name: "Guinea",
    country_code: "+224",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    country_code: "+245",
    code: "GW",
  },
  {
    name: "Guyana",
    country_code: "+595",
    code: "GY",
  },
  {
    name: "Haiti",
    country_code: "+509",
    code: "HT",
  },
  {
    name: "Holy See (Vatican City State)",
    country_code: "+379",
    code: "VA",
  },
  {
    name: "Honduras",
    country_code: "+504",
    code: "HN",
  },
  {
    name: "Hong Kong",
    country_code: "+852",
    code: "HK",
  },
  {
    name: "Hungary",
    country_code: "+36",
    code: "HU",
  },
  {
    name: "Iceland",
    country_code: "+354",
    code: "IS",
  },
  {
    name: "India",
    country_code: "+91",
    code: "IN",
  },
  {
    name: "Indonesia",
    country_code: "+62",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    country_code: "+98",
    code: "IR",
  },
  {
    name: "Iraq",
    country_code: "+964",
    code: "IQ",
  },
  {
    name: "Ireland",
    country_code: "+353",
    code: "IE",
  },
  {
    name: "Isle of Man",
    country_code: "+44",
    code: "IM",
  },
  {
    name: "Israel",
    country_code: "+972",
    code: "IL",
  },
  {
    name: "Italy",
    country_code: "+39",
    code: "IT",
  },
  {
    name: "Jamaica",
    country_code: "+1876",
    code: "JM",
  },
  {
    name: "Japan",
    country_code: "+81",
    code: "JP",
  },
  {
    name: "Jersey",
    country_code: "+44",
    code: "JE",
  },
  {
    name: "Jordan",
    country_code: "+962",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    country_code: "+77",
    code: "KZ",
  },
  {
    name: "Kenya",
    country_code: "+254",
    code: "KE",
  },
  {
    name: "Kiribati",
    country_code: "+686",
    code: "KI",
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    country_code: "+850",
    code: "KP",
  },
  {
    name: "Korea, Republic of South Korea",
    country_code: "+82",
    code: "KR",
  },
  {
    name: "Kuwait",
    country_code: "+965",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    country_code: "+996",
    code: "KG",
  },
  {
    name: "Laos",
    country_code: "+856",
    code: "LA",
  },
  {
    name: "Latvia",
    country_code: "+371",
    code: "LV",
  },
  {
    name: "Lebanon",
    country_code: "+961",
    code: "LB",
  },
  {
    name: "Lesotho",
    country_code: "+266",
    code: "LS",
  },
  {
    name: "Liberia",
    country_code: "+231",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    country_code: "+218",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    country_code: "+423",
    code: "LI",
  },
  {
    name: "Lithuania",
    country_code: "+370",
    code: "LT",
  },
  {
    name: "Luxembourg",
    country_code: "+352",
    code: "LU",
  },
  {
    name: "Macao",
    country_code: "+853",
    code: "MO",
  },
  {
    name: "Macedonia",
    country_code: "+389",
    code: "MK",
  },
  {
    name: "Madagascar",
    country_code: "+261",
    code: "MG",
  },
  {
    name: "Malawi",
    country_code: "+265",
    code: "MW",
  },
  {
    name: "Malaysia",
    country_code: "+60",
    code: "MY",
  },
  {
    name: "Maldives",
    country_code: "+960",
    code: "MV",
  },
  {
    name: "Mali",
    country_code: "+223",
    code: "ML",
  },
  {
    name: "Malta",
    country_code: "+356",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    country_code: "+692",
    code: "MH",
  },
  {
    name: "Martinique",
    country_code: "+596",
    code: "MQ",
  },
  {
    name: "Mauritania",
    country_code: "+222",
    code: "MR",
  },
  {
    name: "Mauritius",
    country_code: "+230",
    code: "MU",
  },
  {
    name: "Mayotte",
    country_code: "+262",
    code: "YT",
  },
  {
    name: "Mexico",
    country_code: "+52",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    country_code: "+691",
    code: "FM",
  },
  {
    name: "Moldova",
    country_code: "+373",
    code: "MD",
  },
  {
    name: "Monaco",
    country_code: "+377",
    code: "MC",
  },
  {
    name: "Mongolia",
    country_code: "+976",
    code: "MN",
  },
  {
    name: "Montenegro",
    country_code: "+382",
    code: "ME",
  },
  {
    name: "Montserrat",
    country_code: "+1664",
    code: "MS",
  },
  {
    name: "Morocco",
    country_code: "+212",
    code: "MA",
  },
  {
    name: "Mozambique",
    country_code: "+258",
    code: "MZ",
  },
  {
    name: "Myanmar",
    country_code: "+95",
    code: "MM",
  },
  {
    name: "Namibia",
    country_code: "+264",
    code: "NA",
  },
  {
    name: "Nauru",
    country_code: "+674",
    code: "NR",
  },
  {
    name: "Nepal",
    country_code: "+977",
    code: "NP",
  },
  {
    name: "Netherlands",
    country_code: "+31",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    country_code: "+599",
    code: "AN",
  },
  {
    name: "New Caledonia",
    country_code: "+687",
    code: "NC",
  },
  {
    name: "New Zealand",
    country_code: "+64",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    country_code: "+505",
    code: "NI",
  },
  {
    name: "Niger",
    country_code: "+227",
    code: "NE",
  },
  {
    name: "Nigeria",
    country_code: "+234",
    code: "NG",
  },
  {
    name: "Niue",
    country_code: "+683",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    country_code: "+672",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    country_code: "+1670",
    code: "MP",
  },
  {
    name: "Norway",
    country_code: "+47",
    code: "NO",
  },
  {
    name: "Oman",
    country_code: "+968",
    code: "OM",
  },
  {
    name: "Pakistan",
    country_code: "+92",
    code: "PK",
  },
  {
    name: "Palau",
    country_code: "+680",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    country_code: "+970",
    code: "PS",
  },
  {
    name: "Panama",
    country_code: "+507",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    country_code: "+675",
    code: "PG",
  },
  {
    name: "Paraguay",
    country_code: "+595",
    code: "PY",
  },
  {
    name: "Peru",
    country_code: "+51",
    code: "PE",
  },
  {
    name: "Philippines",
    country_code: "+63",
    code: "PH",
  },
  {
    name: "Pitcairn",
    country_code: "+872",
    code: "PN",
  },
  {
    name: "Poland",
    country_code: "+48",
    code: "PL",
  },
  {
    name: "Portugal",
    country_code: "+351",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    country_code: "+1939",
    code: "PR",
  },
  {
    name: "Qatar",
    country_code: "+974",
    code: "QA",
  },
  {
    name: "Romania",
    country_code: "+40",
    code: "RO",
  },
  {
    name: "Russia",
    country_code: "+7",
    code: "RU",
  },
  {
    name: "Rwanda",
    country_code: "+250",
    code: "RW",
  },
  {
    name: "Reunion",
    country_code: "+262",
    code: "RE",
  },
  {
    name: "Saint Barthelemy",
    country_code: "+590",
    code: "BL",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    country_code: "+290",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    country_code: "+1869",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    country_code: "+1758",
    code: "LC",
  },
  {
    name: "Saint Martin",
    country_code: "+590",
    code: "MF",
  },
  {
    name: "Saint Pierre and Miquelon",
    country_code: "+508",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    country_code: "+1784",
    code: "VC",
  },
  {
    name: "Samoa",
    country_code: "+685",
    code: "WS",
  },
  {
    name: "San Marino",
    country_code: "+378",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    country_code: "+239",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    country_code: "+966",
    code: "SA",
  },
  {
    name: "Senegal",
    country_code: "+221",
    code: "SN",
  },
  {
    name: "Serbia",
    country_code: "+381",
    code: "RS",
  },
  {
    name: "Seychelles",
    country_code: "+248",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    country_code: "+232",
    code: "SL",
  },
  {
    name: "Singapore",
    country_code: "+65",
    code: "SG",
  },
  {
    name: "Slovakia",
    country_code: "+421",
    code: "SK",
  },
  {
    name: "Slovenia",
    country_code: "+386",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    country_code: "+677",
    code: "SB",
  },
  {
    name: "Somalia",
    country_code: "+252",
    code: "SO",
  },
  {
    name: "South Africa",
    country_code: "+27",
    code: "ZA",
  },
  {
    name: "South Sudan",
    country_code: "+211",
    code: "SS",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    country_code: "+500",
    code: "GS",
  },
  {
    name: "Spain",
    country_code: "+34",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    country_code: "+94",
    code: "LK",
  },
  {
    name: "Sudan",
    country_code: "+249",
    code: "SD",
  },
  {
    name: "Suriname",
    country_code: "+597",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    country_code: "+47",
    code: "SJ",
  },
  {
    name: "Swaziland",
    country_code: "+268",
    code: "SZ",
  },
  {
    name: "Sweden",
    country_code: "+46",
    code: "SE",
  },
  {
    name: "Switzerland",
    country_code: "+41",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    country_code: "+963",
    code: "SY",
  },
  {
    name: "Taiwan",
    country_code: "+886",
    code: "TW",
  },
  {
    name: "Tajikistan",
    country_code: "+992",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    country_code: "+255",
    code: "TZ",
  },
  {
    name: "Thailand",
    country_code: "+66",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    country_code: "+670",
    code: "TL",
  },
  {
    name: "Togo",
    country_code: "+228",
    code: "TG",
  },
  {
    name: "Tokelau",
    country_code: "+690",
    code: "TK",
  },
  {
    name: "Tonga",
    country_code: "+676",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    country_code: "+1868",
    code: "TT",
  },
  {
    name: "Tunisia",
    country_code: "+216",
    code: "TN",
  },
  {
    name: "Turkey",
    country_code: "+90",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    country_code: "+993",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    country_code: "+1649",
    code: "TC",
  },
  {
    name: "Tuvalu",
    country_code: "+688",
    code: "TV",
  },
  {
    name: "Uganda",
    country_code: "+256",
    code: "UG",
  },
  {
    name: "Ukraine",
    country_code: "+380",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    country_code: "+971",
    code: "AE",
  },
  {
    name: "United Kingdom",
    country_code: "+44",
    code: "GB",
  },
  {
    name: "United States",
    country_code: "+1",
    code: "US",
  },
  {
    name: "Uruguay",
    country_code: "+598",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    country_code: "+998",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    country_code: "+678",
    code: "VU",
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    country_code: "+58",
    code: "VE",
  },
  {
    name: "Vietnam",
    country_code: "+84",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    country_code: "+1284",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    country_code: "+1340",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    country_code: "+681",
    code: "WF",
  },
  {
    name: "Yemen",
    country_code: "+967",
    code: "YE",
  },
  {
    name: "Zambia",
    country_code: "+260",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    country_code: "+263",
    code: "ZW",
  },
];

export default countries;
