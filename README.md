# SvelteKit Online Store

This is an online store based on the [SvelteKit](https://kit.svelte.dev/)  is a powerful web development framework built on [Svelte](https://svelte.dev/) and [Vite](https://vitejs.dev/), designed for speed and simplicity. 

Svelte allows us to create lightweight, modern web applications with highly optimized JavaScript. It is not a framework; it is a compiler. Svelte takes your code as input and uses it to generate vanilla JavaScript by compiling it during the build process into a single vanilla JavaScript bundle. This eliminates the need for a library like most other front-end frameworks. This means we are shipping the smallest amount of code possible code that is not only small in size but also super-efficient. This makes Svelte faster than most other front-end frameworks. Svelte also enables us to achieve true reactivity in our apps.

Most other JavaScript frameworks rely on APIs to detect when data changes to update the virtual DOM, meaning their reactivity is tied to it. However, Svelte does not use a virtual DOM. Instead, it writes code that updates the DOM whenever the state in the app changes, allowing us to achieve true reactivity. Svelte itself is just the UI layer. It allows us to write code that is compiled into browser-readable JavaScript. What it does not do are things like routing, for which we would need to use a third-party router. It also does not support server-side rendering (SSR). All of our Svelte code is only available on the client, which is not necessarily ideal for SEO. This is where SvelteKit comes in handy. It provides us with a built-in route, server-side rendering, code splitting, and many other features that not only improve performance but also enhance the developer experience.


As a cloud-based database, [MongoDB](https://www.mongodb.com/atlas/database) is used with [Prisma ORM](https://www.prisma.io/ ). 

[Stripe](https://stripe.com/) payment service (test mode) is integrated into the app, allowing you to make purchases with test card numbers and view all transactions on Stripe's *Payments* panel.

 In this Online Store app
 + Implemented user authentication using Cookies.
 + Integrating [Stripe](https://stripe.com/)  the React framework for the [React Stripe Checkout](https://www.npmjs.com/package/react-stripe-checkout) component.
 + Created **Prisma** schema for **MongoDB**
 + Implemented data validation with [Zod](https://zod.dev/) to ensure the reliability of user input
 + Integrated **Stripe** payment service into the app
 + Enriched user interfaces with [Bootstrap](https://getbootstrap.com/) support for styling components.




To get started.
```
       # Clone the repository

         git clone https://github.com/Ashot72/SvelteKit-Online-Store
         cd SvelteKit-Online-Store

       # Create the .env file based on the env.example.txt file and include the respective keys.
       
       # installs dependencies
         npm install --force

       # to run in development mode
         npm run dev
      
       # to test build preview
         npm run build
         npm run preview
      
       # Stripe Card Information for testing
         Card Number: 4242 4242 4242 4242
         CVC: 567
         Expiration Date: 12/34
```

Go to [SvelteKit Online Store Video](https://youtu.be/roPUj0l-Y-U) page

Go to [SvelteKit Online Store Description](https://ashot72.github.io/SvelteKit-Online-Store/root/doc.html) page
