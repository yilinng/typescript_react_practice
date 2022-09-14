 const posts = [
    {
        id: 1,
        title: "How to write clean react code",
        content: `This temporarily "lies" to the TypeScript compiler that {} is of type User. You should follow up by setting the user state — if you don't, the rest of your code may rely 
            on the fact that user is of type User and that may lead to runtime errors.`
    },
    {
        id: 2,
        title: "Eat, sleep, code, repeat",
        content: `See also the Using Inferred Types section 
            if you need to use a complex type that you've relied on inference for.
            However, many hooks are initialized with null-ish default values,
            and you may wonder how to provide types. Explicitly declare the type, 
            and use a union type:`

    },
 ];

 export default posts