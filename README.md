This is a [Next.js 14](https://nextjs.org/) project clone trello

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Environment

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
```

DATABASE_URL - in prisma i use postgres
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - your clerk unique key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY - your unsplash unique key to use unsplash service

### About project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will see the main page where you can register or log in to your profile, and you can also create organizations using Clerk

Next, you will be automatically taken to a page with your boards, you can create a board with beautiful pictures provided by the Splash service

When you create a board, you will be moved to a page with a board where you can create your own sheets with cards. you can beautifully edit the placemarks of a board, sheet or card, you can also copy an entire sheet, delete it or add a card to it.

When you add your cards, they can be moved among the sheet as well as among other sheets, and you can also change the order of the sheets themselves.

In the board option, you can delete it and in this case you will be taken to your information page with the boards

On the organization settings page, you can configure the organization, add members to it, and set permissions

I made this project for myself to conduct business planning and in the future I will improve and supplement it.

### Русский:

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере, чтобы увидеть результат.

Вы увидите главную страницу, на которой можно зарегистрироваться или войти в свой профиль, также есть возможность создавать организации с помощью Clerk.
<p>
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/1b12c548-fab0-4fb9-a670-49690e82ed7f" alt="todo-plans" width="500px">
</p>

Далее вы попадете автоматически на страницу со своими досками, можно создать доску с красивыми картинками, которые предоставляет Splash сервис, также будет проверка входных данных:
<p>
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/f000e75e-0bb7-484d-9c5b-330d3e374d35" alt="todo-plans" width="500px">
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/60ff3800-ddb4-44c6-b038-b26c323d0009" alt="todo-plans" width="200px">
</p>

При создании доски вы будете перемещены на страницу с доской, где сможете создавать свои листы с карточками. можно красиво редактировать загаловки доски, листа или карточки, также можно скопировать целый лист, удалить его или добавить к нему карточку.

Когда вы добавите свои карточки, их можно будет перемещать среди листа а также среди других листов, и можно также менять порядок самих листов.
<p>
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/b5ce45a8-3d1f-4bf8-ba76-6fe5f32d2f51" alt="todo-plans" width="400px">
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/a1e63f55-62fe-4b9e-8a19-02fae287fe6b" alt="todo-plans" width="400px">
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/e7c1ca0c-10ad-47c3-a09a-9f5d9e8852b8" alt="todo-plans" width="400px">
</p>

В опции доски можно ее удалить и в таком случае вы попадете к себе на информационную страницу с досками.
<p>
  <img src="https://github.com/DanilaBesk/todo-plans/assets/127431527/9e7ac41f-a093-441e-bd24-e29c1ad8ac3a" alt="todo-plans" width="260px">
</p>

На странице с настройкой организации можно будет настроить организацию, добавить к ней членов и установить права.

Этот проект я делал для себя для ведения планирования дел и в будущем я буду его улучшать и дополнять.
