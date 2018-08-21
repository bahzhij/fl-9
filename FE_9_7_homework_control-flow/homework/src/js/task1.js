const masterLogin = 'User';
const masterPass = 'SuperUser';
let hour = new Date().getHours();

let login = prompt('Please enter your login');

if (login === masterLogin) {
    let password = prompt('Please enter your password');
    if (password === masterPass) {
        if (hour < 20) {
            alert('Good day!')
        } else {
            alert('Good evening!')
        }
    } else if (password === '' || password === null) {
        alert('Canceled');
    } else {
        alert('Wrong password');
    }
} else if (login === null || login === '') {
    alert('Canceled');
} else if (login.length < 4) {
    alert(`I don't know any users having name length less than 4 symbols`);
} else {
    alert(`I don’t know you`);
}
