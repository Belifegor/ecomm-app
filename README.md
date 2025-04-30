🛒 ECOMM-APP

Мультистраничное e-commerce приложение, реализованное на React + TypeScript с использованием Vite, TailwindCSS, ESLint, Prettier и Husky.

🚀 Технологии

React

TypeScript

Vite

TailwindCSS

ESLint

Prettier

Husky

Zustand — для управления состоянием

Axios — для работы с API

📦 Установка и запуск

git clone https://github.com/Belifegor/ecomm-app.git
cd ecomm-app
npm install
npm run dev

Проект запустится на http://localhost:5173/

🧭 Работа с ветками (Git Flow)

🔁 Переключись на develop

git checkout develop
git pull origin develop

Если ветки нет:

git fetch origin develop
git checkout -b develop origin/develop

👨‍💻 Как работает каждый участник

1. Клонируешь репозиторий и переключаешься на develop

git clone https://github.com/Belifegor/ecomm-app.git
cd ecomm-app
git checkout develop
git pull origin develop

2. Создаёшь свою личную ветку от develop

Каждый работает в отдельной ветке от develop, чтобы не мешать другим.

git checkout -b your-name/feature-name

Примеры:

alex/product-card

kate/cart-page

john/fix-header

3. Выполняешь свою задачу

Работаешь в своей ветке.

Периодически коммитишь:

git add .
git commit -m "feat: add product card component"

Пушишь ветку:

git push origin your-name/feature-name

4. Создаёшь Pull Request → в develop

На GitHub открываешь PR из своей ветки в develop

Пишешь, что реализовано

После одобрения — мержишь

5. Финальный Pull Request → в main делает только тимлид в конце спринта

Ветка main защищена — туда коммиты напрямую запрещены.Все фичи и правки идут через develop, а потом один финальный PR в main.

📂 Структура проекта

src/
├── assets/        # Изображения и иконки
├── components/    # Переиспользуемые компоненты
├── hooks/         # Кастомные React-хуки
├── pages/         # Страницы, если есть маршрутизация
├── services/      # Работа с API
├── store/         # Zustand-хранилище
├── styles/        # Глобальные стили (index.css)
├── utils/         # Вспомогательные функции
├── App.tsx
└── main.tsx

🧪 Сценарии

npm run dev               # Запуск проекта
npm run build             # Сборка проекта
npm run lint              # Проверка кода ESLint
npx prettier --write .    # Форматирование кода вручную

💡 Советы

Используйте ветки для каждой задачи

Коммиты оформляйте по [Conventional Commits](https://rs.school/docs/ru/git-convention)

Husky не даст закоммитить код с ошибками — это нормально 🙂