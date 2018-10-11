import dev from "./configureStore.dev";
import prod from "./configureStore.prod";

export default new Promise( (resolve,reject) => {
if (process.env.NODE_ENV === "production") {
    resolve(prod().then((storeWeb) => storeWeb))
} else {
    resolve(dev().then((storeWeb) => storeWeb )).catch(e => {throw e});
}
})