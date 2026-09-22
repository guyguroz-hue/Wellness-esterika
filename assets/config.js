// ===== הגדרות =====
// המפתח הפומבי (publishable) נועד לרוץ בדפדפן ובטוח לפרסום — ההגנה מגיעה
// ממדיניות ה-RLS שב-supabase/schema.sql: הדף הציבורי יכול רק להוסיף הרשמה.
// לעולם אל תשימו כאן את מפתח ה-service_role / secret.
window.ESTERIKA_CONFIG = {
  SUPABASE_URL: 'https://reltdehazsgdxwjozrfo.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_TEFCY8AWV7dyic8urwvmEA_U3qO_U99',
  WHATSAPP: '972545367306',

  // התראה במייל על כל הרשמה חדשה.
  // כל מפתח כאן = כתובת מייל אחת שמקבלת התראה. להוספת נמען: נרשמים בחינם
  // ב-web3forms.com עם אותה כתובת, ומוסיפים כאן את ה-Access Key שמתקבל.
  NOTIFY_ACCESS_KEYS: [
    '61544ec9-1637-40cb-ad78-3746aa4fe2fb',
    '0ddb6462-a74b-4e34-9110-30ba70dc7367'
  ],

  // חשבון הניהול המשותף. הכניסה לעמוד הנרשמים היא עם קוד בלבד —
  // הקוד הוא הסיסמה של החשבון הזה ב-Supabase (Authentication → Users).
  // המייל כאן הוא רק מזהה; הסוד היחיד הוא הקוד, והוא לא נשמר בקוד המקור.
  ADMIN_EMAIL: 'esterikatruck@gmail.com',

  // התראת פוש לטלפון על כל הרשמה (דרך ntfy.sh — בלי מייל ובלי וואטסאפ).
  // המנהלים מתקינים את אפליקציית ntfy ונרשמים לנושא הזה. ההודעה מכוונת
  // לעמוד הנרשמים ואינה מכילה פרטים אישיים, כי מי שיודע את שם הנושא
  // יכול להירשם אליו. ריק = בלי פוש.
  NTFY_TOPIC: 'esterika-ed0ee3954c25',
  ADMIN_URL: 'https://wellness-esterika.vercel.app/admin' 
};
