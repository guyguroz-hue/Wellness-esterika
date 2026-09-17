# הבוקר הוולנסי · אסתריקה

דף נחיתה לאירוע "הבוקר הוולנסי" של עגלת הקפה אסתריקה:
שיעור יוגה → סדנת נשימות וטבילה באמבטיית קרח → ארוחת בוקר מפנקת.

## מבנה
- `index.html` — הדף (עברית, RTL)
- `assets/style.css` — עיצוב
- `assets/config.js` — **כאן מזינים את מפתחות Supabase ומספר הוואטסאפ**
- `assets/main.js` — אנימציות גלילה ושליחת טופס ההרשמה
- `assets/images/` — תמונות מהאטרקציות
- `supabase/schema.sql` — יצירת טבלת הנרשמים והרשאות

## הרצה מקומית
```bash
python3 -m http.server 8000
```
ואז http://localhost:8000

## חיבור טופס ההרשמה ל-Supabase
1. נכנסים ל-[supabase.com](https://supabase.com) → **New project** (התוכנית החינמית מספיקה).
2. **SQL Editor** → מדביקים את התוכן של `supabase/schema.sql` → **Run**.
3. **Project Settings → API** → מעתיקים את ה-`Project URL` ואת מפתח ה-`anon public`.
4. מדביקים אותם ב-`assets/config.js` ודוחפים לגיט.

מרגע זה כל הרשמה נשמרת בטבלה `registrations`, ואפשר לראות אותה ב-Supabase תחת
**Table Editor → registrations** — כולל סינון, עריכת סטטוס וייצוא ל-CSV.
בעמודה `status` אפשר לעדכן ידנית: חדש / אושר / שילם / ביטל.

רוצים גם מייל על כל הרשמה? Supabase → **Database → Webhooks**, או חיבור Zapier/Make
לטבלה.

### למה זה בטוח לשים את המפתח בקוד?
מפתח ה-`anon` נועד לרוץ בדפדפן. `schema.sql` מפעיל RLS ומאפשר למשתמש אנונימי
**רק להוסיף שורה** — אי אפשר לקרוא, לערוך או למחוק הרשמות של אחרים מהדף.

### בלי Supabase
אם `assets/config.js` נשאר ריק, הטופס פשוט פותח וואטסאפ עם הודעה מוכנה —
כך שהדף עובד גם לפני ההגדרה, וגם אם Supabase נופל.

## פריסה
מתאים ל-Vercel, Netlify או GitHub Pages — אתר סטטי ללא שלב build.
ב-Vercel: Import Project → Framework Preset: **Other** → Deploy.

## מה כדאי לעדכן
- התאריך, השעות והמיקום המדויק (סקשן "פרטי המפגש" ב-`index.html`)
