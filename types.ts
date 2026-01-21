
export type Language = 'ru' | 'kg' | 'en' | 'ge' | 'kz';

export interface Translation {
  title: string;
  subtitle: string;
  heroBtn2: string;
  ownerBtn: string;
  ownerSub: string;
  driverBtn: string;
  driverSub: string;
  fullName: string;
  passportNum: string;
  address: string;
  phone: string;
  carDataSpec: string;
  bishkekCode: string;
  photoBtn: string;
  payBtn: string;
  
  // Receiver fields
  receiverFullName: string;
  receiverPassport: string;
  receiverAddress: string;
  receiverPhone: string;
  
  // Driver fields
  driverFullName: string;
  driverPassport: string;
  driverAddress: string;
  driverPhone: string;

  featuresTitle: string;
  feat1: string;
  feat1Sub: string;
  feat2: string;
  feat2Sub: string;
  feat4: string;
  feat4Sub: string;
  contactUs: string;
  chatPlaceholder: string;
  initialBotMessage: string;
  georgia: string;
  kyrgyzstan: string;
  officeTitle: string;
  officeAddress: string;
  routeBtn: string;
  callBtn: string;
  footerAbout: string;
  footerServicesTitle: string;
  footerService1: string;
  footerService2: string;
  footerService3: string;
  footerService4: string;
  footerContactsTitle: string;
  footerBishkek: string;
  footerRights: string;
  onlineStatus: string;

  // Added keys to fix errors in MainForm.tsx
  mainFormTitle: string;
  clientType: string;
  clientIndividual: string;
  clientCompany: string;
  carData: string;
  origin: string;
  destination: string;
  submitBtn: string;
}
