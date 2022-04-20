# 腾讯课堂学习知识点

1.2W 字 | 了不起的 TypeScript 入门教程
https://juejin.cn/post/6844904182843965453#comment

# js 缺点

1. 没有对类型进行校验
2. 没有对是否传入参数进行校验
   只有等到运行时才会报错，会影响后续代码的执行

# 什么是 TS

TypeScript 是拥有类型的 JavaScript 超集，它可以编译成普通、干净、完整的 JavaScript 代码
TS 会被编译成 JS 代码

# TS 的编译环境

1. tsc: typescript compiler
   npm install typescript -g
   tsc --version
2. babel: plugin/preset

`tsc ts文件` 把 ts 转化成 js

# TS 运行环境

两种方法

1. webpack 搭建一个 ts 环境
2. ts-node 安装
   npm install ts-node
   npm install tslib @types/node
   如何使用 ts-node ts 文件

# 变量声明

eslint -> js 代码规范
tslint -> ts 代码规范

string TS 中的字符串类型
String JS 的字符串包装类的类型

- 如果没有添加类型注解，就会进行类型推导/推断
  类型推导：默认情况下进行赋值时，会将赋值的值得类型，作为前面标识符的类型

# ts 基础类型

1. Boolean
2. Number
3. String
4. Array
5. Symbol

   ```ts
   const title1 = Symbol("title");
   const title2 = Symbol("title");

   const info = {
     [title1]: "老师",
     [title2]: "程序员",
   };
   ```

6. Enum 枚举

   ```ts
   // 定义枚举
   enum Gender {
     Male = 0,
     Female = 1,
   }
   let i: { name: string; gender: Gender };
   i = {
     name: "孙悟空",
     gender: Gender.Male, //'male'
   };
   ```

7. Tuple 元组

   ```ts
   const arr: [number, string] = [1, "1"];
   ```

8. any
   不会进行类型检测

9. unknown
   unknown 类型只能赋值给 unknown 和 any 类型
   any 类型可以赋值给任意类型

   ```ts
   let flag = true;
   let result: unknown;
   // 或者
   // let result: any;
   // let result: string | number;
   if (flag) {
     result = "hell0";
   } else {
     result = 123;
   }
   ```

10. never
    never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
    使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。

    ```ts
    // 表示永远没有返回结果
    function foo(): never {
      while (true) {}
    }
    ```

    ```ts
    // throw也不会有返回结果
    function bar(): never {
      throw new Error();
    }
    ```

    ```ts
    function handleMessage(message: number | string) {
      switch (typeof message) {
        case "string":
          console.log("string处理方式");
          break;
        case "number":
          console.log("number处理方式处理");
          break;
      }
    }

    function handleMessage(message: number | string | boolean) {
      switch (typeof message) {
        case "string":
          console.log("string处理方式");
          break;
        case "number":
          console.log("number处理方式处理");
          break;
        default:
          // 如果其他人增加了message的类型如boolean,
          // 编译时直接报错, 表示该函数对number|string以外的类型做了处理
          const check: never = message;
      }
    }

    // 如果某一天张三传进来boolean值，有可能会修改handleMessage函数， 添加boolean类型
    handleMessage(true);
    ```

11. void
    表示没有返回值

    ```ts
    function sum(num1: number, num2: number): void {
      console.log(num1 + num2);
    }
    ```

12. null 和 undefined

    ```ts
    let n1: null = null;
    let n2: undefined = undefined;
    ```

13. 对象类型

14. 类类型

    ```ts
    class Person {
      name: string = "six";
    }

    const p = new Person();
    const p1: Person = {
      name: "111",
    };
    // 或者
    function printPerson(p: Person) {
      console.log(p.name);
    }
    printPerson(new Person());
    printPerson({ name: "six", eating: function () {} });
    ```

# 类型断言 as 和非空类型断言 !

1. 类型断言 as
   ts 无法获取具体的类型信息, 使用类型断言
   ts 只允许类型断言转换为更具体或者不太具体的类型版本

   1. 案例一

      ```ts
      // <img id="why" />
      // el类型会自动推导为 HTMLElement
      const el = document.getElementById("why");
      // 以下代码会提示错误, 因为HTMLElement类型范围太广
      el.src = "url地址";
      ```

      ```ts
      // <img id="why" />
      // 使用类型断言
      const el = document.getElementById("why") as HTMLImageElement;
      el.src = "url地址";
      ```

   2. 案例二

      ```ts
      class Person {}
      class Student extends Person {
        studying() {}
      }

      function sayHello(p: Person) {
        (p as Student).studying();
      }

      const stu = new Student();
      sayHello(stu);
      ```

   3. 案例三
      转换为不太具体的类型版本

      ```ts
      const message = "six";
      const num: number = message as any as number;
      ```

2. 非空类型断言!
   message!.length 表示编译时会忽略 message 为 undefined 和 null 类型, 即该值不为空或未定义

   ```ts
   // message? 相当于 undefined | string
   // 以下代码不能通过编译
   // 如果message为Undefined, undefined.length会报错
   function printMessageLength(message?: string) {
     console.log(message.length);
   }
   printMessageLength("hello world");
   printMessageLength("哈哈哈哈");
   printMessageLength();
   ```

   ```ts
   // 解决方案1
   function printMessageLength(message?: string) {
     // 手动类型缩小
     if (message) {
       console.log(message!.length);
     }
   }
   printMessageLength("hello world");
   printMessageLength("哈哈哈哈");
   printMessageLength();
   ```

   ```ts
   // 解决方案2
   function printMessageLength(message?: string) {
     console.log(message!.length);
   }
   printMessageLength("hello world");
   printMessageLength("哈哈哈哈");
   printMessageLength();
   ```

# 联合类型 |和 可选类型? 和 交叉类型&

1. 联合类型 |

   ```ts
   function printID(id: number | string | boolean) {
     if (typeof id === "string") {
       console.log(id.toUpperCase());
     } else {
       console.log(id);
     }
   }
   printID(123);
   printID("abc");
   ```

2. 可选类型 ?

   ```ts
   function printPoint(point: { x: number; y: number; z?: number }) {
     console.log(point.x);
     console.log(point.y);
     console.log(point.z);
   }
   printPoint({ x: 123, y: 321 });
   ```

3. 交叉类型 &
   交叉类型必须全部满足

   ```ts
   interface ISwim {
     swimming: () => void;
   }
   interface IFlying {
     flying: () => void;
   }

   type MyType1 = ISim | IFlying;

   type MyType2 = ISwim & IFlying;

   const obj1: MyType1 = {
     swimming() {},
   };

   const obj2: MyType2 = {
     swimming() {},
     flying() {},
   };
   ```

# 类型别名 type

# 可选链 和 特殊操作符

```ts
type Imsg = {
  name: string;
  age: number;
  friend?: {
    name: string;
    age: number;
    girlfriend?: {
      name: string;
      age: number;
    };
  };
};

const msg: Imsg = {
  name: "six",
  age: 18,
  friend: {
    name: "560",
    age: 20,
  },
};

console.log(msg.friend?.name, msg.friend?.girlfriend, "1");
```

# 函数

```ts
// 定义参数为函数
function foo() {
  console.log("foo");
}
type fnType = () => void;
function bar(fn: fnType) {
  fn();
}
bar(foo);

// 定义箭头函数
type addType = (n1: number, n2: number) => number;
const add: addType = (a1: number, a2: number) => {
  return a1 + a2;
};

let res = add(1, 2);
console.log(res);

// 定义索引类型
type objType = {
  [index: number]: string;
};

const obj: objType = {
  0: "qkqq",
  1: "wazt",
  2: "nha",
};

// 接口定义函数类型
// 表示可调用接口
interface IAddType {
  (num1: number, num2: number): number;
}
var add: IAddType = (num1, num2) => {
  return num1 + num2;
};
```

# 函数的重载

名称相同但是参数不同

```ts
// 函数类型声明
function add(a1: string, a2: string): string;
// 函数类型声明
function add(a1: number, a2: number): number;

// 函数类型实现
function add(a1: any, a2: any): any {
  return a1 + a2;
}
```

# 接口

1. 接口的继承

```ts
interface ISwim {
  swimming: () => void;
}

interface IFly {
  flying: () => void;
}

interface IAction extends ISwim, IFly {}

const action: IAction = {
  swimming() {},
  flying() {},
};
```

# 类

1. 基本使用

   ```ts
   // 定义的属性需要经过初始化
   class Person {
     name: string;
     age: number;

     constructor(name: string, age: number) {
       this.name = name;
       this.age = age;
     }
     eating() {
       console.log(this.name + "eating");
     }
   }

   const p = new Person("six", 18);
   ```

2. 类的继承与重写

   1. 继承

      ```ts
      class Person {
        name: string = "";
        age: number = 0;

        eating() {
          console.log("eating");
        }
      }
      class Student extends Person {
        sno: number = 0;

        studying() {
          console.log("studying");
        }
      }

      class Teacher extends Person {
        title: string = "";

        teaching() {
          console.log("teaching");
        }
      }
      ```

   2. 重写

      ```ts
      class Animal {
        name: string;
        age: string;

        constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
        }
        sayHello() {
          console.log("动物在叫");
        }
      }

      class Dog extends Animal {
        // 方法重写： 子类覆盖父类的方法
        sayHello() {
          console.log(`${this.name} 嘤嘤嘤`);
        }
      }

      class Cat extends Animal {
        sayHello() {
          console.log(`${this.name} 喵喵喵`);
        }
      }
      ```

3. 多态使用 - 继承是多态的前提
   父类引用指向子类对象
   `const dog: Animal = new Dog()`
   多态的目的是为了写出更加具备通用性的代码

   ```ts
   class Animal {
     action() {
       console.log("animal running");
     }
   }

   class Dog extends Animal {
     action() {
       console.log("dog  running");
     }
   }

   class Fish extends Animal {
     action() {
       console.log("fish swimming");
     }
   }
   // 父类引用指向子类对象
   function makeActions(animals: Animal[]) {
     animals.forEach((animal) => {
       // 会执行重写之后的方法
       animal.action();
     });
   }
   // 可以填入所有Animal的子类
   makeActions([new Dog(), new Fish()]);
   ```

4. 成员修饰符

   1. public 修饰符

      ```ts
      class Person {
        // 默认为public修饰符
        name: string = "";
        // public name: string = ''
      }

      let p = new Person();
      // 可以访问
      console.log(p.name);
      ```

   2. private 修饰符只能在类进行访问, 可以封装 get 和 set 方法

      ```ts
      class Person {
        private name: string = "";

        getName() {
          return this.name;
        }

        setName(newName) {
          this.name = newName;
        }
      }

      let p = new Person();
      // 不能访问
      console.log(p.name);
      // 可以访问
      console.log(p.getName());
      ```

   3. protected 可以在类内部和子类中访问

      ```ts
      class Person {
        protected name: string = "six";
      }

      class Student extends Person {
        getName() {
          // 可以在子类中访问
          return this.name;
        }
      }

      const stu = new Student();
      // 可以访问
      console.log(stu.getName());
      // 不能访问, 警告
      console.log(stu.name);
      ```

5. readonly 只读属性,
   可以访问，但不能修改
   属性本身不能进行修改，如果它是对象类型，对象中的属性可以修改

   ```ts
   class Person {
     readonly name: string;
     readonly friend?: Person;
     constructor(name: string, friend?: Person) {
       this.name = name;
       this.friend = friend;
     }
   }

   const p = new Person("six", new Person("jisoo"));
   ```

6. 访问器 getters/setters

   ```ts
   class Person {
     // _开头表示私有属性, 是一种开发规范
     private _name: string;
     constructor(name: string) {
       this._name = name;
     }
     // 访问器 set/get + 变量名
     set name(newName) {
       this._name = newName;
     }

     get name() {
       return this._name;
     }
   }

   const p = new Person("six");
   // 会调用set
   p.name = "coderwhy";
   // 会调用get
   console.log(p.name);
   ```

7. 静态成员 static

   ```ts
   class Person {
     static time: string = "20:00";

     static studying() {
       console.log("去学习");
     }
   }
   // 可以直接通过类进行访问
   console.log(Person.time);
   Person.studying();
   ```

8. 抽象类 abstract

   1. 在定义很多通用的调用接口时，我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式
   2. 但是父类本身并不需要对某些方法进行具体的实现，所以父类中定义的方法，我们可以定义为抽象方法
   3. 抽象类不能被实例化(不能 new), 实例会有警告
   4. 抽象类中的抽象方法在子类中必须重写

   ```ts
   class Rectangle extends Shape {
     private width: number;
     private height: number;

     constructor(width: number, height: number) {
       super();
       this.width = width;
       this.height = height;
     }

     getArea() {
       return this.width * this.height;
     }
   }

   class Circle extends Shape {
     private r: number;

     constructor(r: number) {
       super();
       this.r = r;
     }
     getArea() {
       return this.r * this.r * 3.14;
     }
   }
   // 传入父类
   function makeArea(shape: any) {
     return shape.getArea();
   }

   const rectangle = new Rectangle(20, 30);
   const circle = new Circle(2);

   console.log(rectangle.makeArea());
   console.log(circle.makeArea());

   // 传入的shape是any类型, 无法进行类型检测
   makeArea("123");
   makeArea("six");
   ```

   ```ts
   // 设置抽象类
   abstract class Shape {
     abstract getArea() {}
   }
   class Rectangle extends Shape {
     private width: number;
     private height: number;

     constructor(width: number, height: number) {
       super();
       this.width = width;
       this.height = height;
     }

     getArea() {
       return this.width * this.height;
     }
   }

   class Circle extends Shape {
     private r: number;

     constructor(r: number) {
       super();
       this.r = r;
     }
     getArea() {
       return this.r * this.r * 3.14;
     }
   }
   // 传入父类, 可以进行类型检测，只能传入Shape或者Shape的子类
   function makeArea(shape: Shape) {
     return shape.getArea();
   }

   const rectangle = new Rectangle(20, 30);
   const circle = new Circle(2);

   console.log(rectangle.makeArea());
   console.log(circle.makeArea());

   // 为了防止其他人传入shape类, 给shape类设置为抽象类
   // 父类的getArea()不该有实现
   // 所以以下代码会有警告
   const shape = new Shape();
   console.log(shape.makeArea());
   ```

9. 类的类型

# 泛型

# 装饰器

# type 和 interface 的区别

interface 可以重复的对某个接口来定义属性和方法；
而 type 定义的是别名，别名是不能重复的；
