import { Person } from './app/person';

import(
    /* webpackChunkName: "user.module" */
    /* webpackPrefetch: true */
    './app/user.module'
).then((userModule) => {
    const user = new userModule.User(new Person('Manuel Artificer'));

    const button = <HTMLElement>document.getElementById('helloBtn');
    button.addEventListener("click", () => { 
        debugger;
        user.displayName(); 
    });
});

$(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

        