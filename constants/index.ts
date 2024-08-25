export const GenderOptions = [
    "male",
    "female",
    "other",
];

export const Doctors = [
    {
      image: "/doctoricon.webp",
      name: "Meredith Grey",
    },
    {
      image: "/doctoricon.webp",
      name: "Derek Shephard",
    },
    {
      image: "/doctoricon.webp",
      name: "Richard Webber",
    },
    {
      image: "/doctoricon.webp",
      name: "Christina Yang",
    },
    {
      image: "/doctoricon.webp",
      name: "Miranda Bailey",
    },
    {
      image: "/doctoricon.webp",
      name: "Jackson Avery",
    },
    {
      image: "/doctoricon.webp",
      name: "Andrew DeLuca",
    },
    {
      image: "/doctoricon.webp",
      name: "Lexie Grey",
    },
  ];

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};