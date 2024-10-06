# tswizlight

Manage Wiz lights easily with this TypeScript library

### Example

```TypeScript
const light = new Light("192.168.1.135");
await light.setColor({ r: 255, g: 0, b: 255, dimming: 75 }); // set to purple
await light.setState(false); // turn light off

console.log(await light.getInfo()); // print light info
```