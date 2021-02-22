export default function validateEmail(email){
    return /.+@.+\.[A-Za-z]+$/.test(email);
}