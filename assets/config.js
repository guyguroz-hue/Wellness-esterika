// ===== הגדרות =====
// 1. היכנסו ל-supabase.com → New project (חינם)
// 2. Project Settings → API → העתיקו את ה-Project URL ואת מפתח ה-anon public
// 3. הדביקו אותם כאן. עד שזה קורה, הטופס נופל חזרה לשליחה בוואטסאפ.
// המפתח ה-anon נועד לשימוש בדפדפן ובטוח לפרסום — ההגנה מגיעה ממדיניות ה-RLS
// שב-supabase/schema.sql (מרשה רק הוספת שורות, בלי קריאה).
window.ESTERIKA_CONFIG = {
  SUPABASE_URL: '',        // https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: '',   // eyJhbGciOi...
  WHATSAPP: '972545367306',

  // המיילים שמורשים להיכנס לעמוד הנרשמים (admin.html).
  // חשוב: להוסיף את אותם מיילים גם בטבלת staff ב-supabase/schema.sql
  MANAGER_EMAILS: [
    'parent1@example.com',
    'parent2@example.com'
  ]
};
