---
outline: deep 
---

# TypeScript 实现数据结构

## 顺序表

```ts
/**
 * 顺序表
 * @description 数组实现的顺序表
 * @template T 数组元素类型
 * @author coderwujx
 */
class SqList<T> {
  private arr: T[]; //数组

  constructor(...items: T[]) {
    this.arr = items || []; //初始化数组，可接收多个参数或不传参数
  }
  /**
   * 数组长度
   * @returns {number}
   */
  get length(): number {
    return this.arr.length; //返回数组长度
  }

  /**
   * 遍历数组
   * @returns {Array}
   */
  traverse(): T[] {
    return [...this.arr]; //返回数组的副本，避免外部修改
  }

  /**
   * 检查索引是否有效
   * @param index 索引
   * @param includeLength 是否包含length位置
   * @throws {Error} 索引越界错误
   */
  private checkIndex(index: number, includeLength = false): void {
    const max = includeLength ? this.length : this.length - 1;
    if (index < 0 || index > max) {
      throw new Error(`索引越界! 索引应在0-${max}范围内`);
    }
  }

  /**
   * 插入元素
   * @param item  插入的元素
   * @param index  插入的位置
   * @returns {boolean} 插入是否成功
   */
  insert(item: T[] | T, index: number): boolean {
    try {
      this.checkIndex(index, true);
      if (Array.isArray(item)) {
        this.arr.splice(index, 0, ...item);
      } else {
        this.arr.splice(index, 0, item);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 首部插入
   * @param item  插入的元素
   */
  prepend(item: T[] | T): boolean {
    return this.insert(item, 0); //在索引0处插入元素
  }

  /**
   * 尾部插入
   * @param item  插入的元素
   */
  append(item: T[] | T): boolean {
    return this.insert(item, this.length); //在索引length处插入元素
  }

  /**
   * 删除元素 并返回删除的元素
   * @param index  删除的位置
   * @returns {T} 删除的元素
   */
  remove(index: number): T {
    this.checkIndex(index);
    const item = this.arr[index]; //获取索引index处的元素
    this.arr.splice(index, 1); //删除索引index处的元素
    return item; //返回删除的元素
  }

  /**
   * 首部删除
   * @returns {T} 删除的元素
   */
  shift(): T {
    if (this.length === 0) throw new Error("顺序表为空!");
    return this.remove(0); //删除索引0处的元素
  }

  /**
   * 尾部删除
   * @returns {T} 删除的元素
   */
  pop(): T {
    if (this.length === 0) throw new Error("顺序表为空!");
    return this.remove(this.length - 1); //删除索引length-1处的元素
  }

  /**
   * 获取元素
   * @param index 按照索引获取
   * @returns {T} 元素
   */
  get(index: number): T {
    this.checkIndex(index);
    return this.arr[index]; //返回索引index处的元素
  }

  /**
   * 修改元素
   * @param index 索引
   * @param item 元素
   */
  set(index: number, item: T): void {
    this.checkIndex(index);
    this.arr[index] = item; //将索引index处的元素修改为item
  }

  /**
   * 查找元素索引
   * @param item 要查找的元素
   * @returns {number} 元素索引，不存在返回-1
   */
  indexOf(item: T): number {
    return this.arr.indexOf(item);
  }

  /**
   * 判断元素是否存在
   * @param item 要判断的元素
   * @returns {boolean} 是否存在
   */
  includes(item: T): boolean {
    return this.arr.includes(item);
  }

  /**
   * 清空数组
   */
  destroy(): void {
    this.arr = []; //清空数组
  }

  /**
   * 转换为普通数组
   * @returns {T[]} 数组
   */
  toArray(): T[] {
    return [...this.arr];
  }
}

```

## 链表

### 单向链表

该单向链表实现
1.LinkedListNode链表节点
2.LinkedList链表
实现方法
1.length属性:链表的长度
2.isEmpty属性:链表是否为空
3.traverse():遍历链表
4.append():向链表尾部追加元素
5.prepend():向链表头部追加元素
6.insert():向链表指定位置(索引)插入元素
7.getItem():根据索引获取元素
8.indexOf():根据元素查找索引位置
9.remove():根据索引删除元素
10.removeHead():删除头节点
11.removeTail():删除尾节点
12.removeByValue():删除第一个匹配到的元素
13.contains():判断链表是否包含某个元素
14.destroy():清空链表

```ts
/**
 * @description 单向链表节点
 * @author coderwujx
 */
class LinkedListNode<T> {
  public element: T; // 节点元素
  public next: LinkedListNode<T> | null = null; // 指向下一个节点的指针
  constructor(element: T) {
    this.element = element; // 初始化节点元素
  }
}
/**
 * @description 单向链表
 * @author coderwujx
 */
export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null; // 头节点
  private _length: number = 0; // 链表长度
  /**
   * @description 初始化链表
   * @param elements 链表元素
   * @author coderwujx
   */
  constructor(elements?: T[] | T) {
    // 修改判断条件：检查 elements 是否存在
    if (elements) {
      if (Array.isArray(elements)) {
        // 如果传入的是数组，则将数组中的元素依次添加到链表中
        elements.forEach((element) => this.append(element));
      } else {
        // 如果传入的是单个元素，则直接将该元素添加到链表中
        this.append(elements as T);
      }
    }
  }
  /**
   * @description 获取链表长度
   * @author coderwujx
   * @returns {number} 链表长度
   */
  get length(): number {
    return this._length; // 返回链表长度
  }
  /**
   * @description 判断链表是否为空
   */
  get isEmpty(): boolean {
    return this._length === 0;
  }

  /**
   * @description 遍历链表
   * @author coderwujx
   */
  public traverse(): void {
    let current = this.head; // 从链表头部开始遍历
    while (current !== null) {
      console.log(current.element); // 输出当前节点的元素
      current = current.next; // 将当前节点指向下一个节点
    }
  }

  /**
   * @description 向链表尾部添加一个新的项
   * @param element 元素
   * @author coderwujx
   * @returns {boolean} 是否添加成功
   */
  public append(element: T): void {
    const newNode = new LinkedListNode(element); // 创建新节点
    if (this.head === null) {
      // 如果链表为空，则将头节点指向新节点
      this.head = newNode;
    } else {
      // 否则，遍历链表，找到最后一个节点，将其 next 指向新节点
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this._length++; // 更新链表长度
  }

  /**
   * @description 向链表头部插入节点
   * @param element 元素
   * @author coderwujx
   */
  public preappend(element: T): void {
    const newNode = new LinkedListNode(element); // 创建新节点
    newNode.next = this.head; // 将新节点的 next 指向头节点
    this.head = newNode; // 将头节点指向新节点
    this._length++; // 更新链表长度
  }

  /**
   * @description 向链表指定位置插入节点
   * @param position 索引
   * @param element 元素
   * @author coderwujx
   */
  public insert(position: number, element: T): boolean {
    if (position < 0 || position > this._length) {
      throw new Error(`位置不合法! 索引应在0-${this._length}范围内`); //位置不合法
    }

    if (position === 0) return this.preappend(element), true; // 头部插入
    if (position === this._length) return this.append(element), true; // 尾部插入

    const newNode = new LinkedListNode(element); // 创建新节点
    let current = this.head; // 从链表头部开始遍历
    let previous: LinkedListNode<T> | null = null; // 记录当前节点的前一个节点
    let index = 0;

    while (index++ < position && current) {
      previous = current;
      current = current.next;
    }

    newNode.next = current;
    previous!.next = newNode;
    this._length++;
    return true;
  }
  /**
   * @description 获取指定位置的元素
   * @param position 索引
   * @author coderwujx
   * @returns {T | null} 元素
   */
  public getItem(position: number): T | null {
    if (position < 0 || position >= this._length) {
      //位置不合法
      console.log("位置不合法!");
      return null;
    }
    let current = this.head; // 从链表头部开始遍历
    let index = 0;
    while (index++ < position && current !== null) {
      current = current.next; // 将当前节点指向下一个节点
    }
    return current?.element || null; // 返回当前节点的元素
  }

  /**
   * @description 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @param element 元素
   * @author coderwujx
   * @returns {number} 索引
   */
  public indexOf(element: T): number {
    let current = this.head; // 从链表头部开始遍历
    let index = 0; // 记录当前节点的索引
    while (current !== null) {
      if (current.element === element) {
        // 如果当前节点的元素等于目标元素，则返回当前节点的索引
        return index;
      }
      current = current.next; // 将当前节点指向下一个节点
      index++; // 将索引加1
    }
    return -1; // 如果链表中没有该元素，则返回-1
  }

  /**
   * @description 按索引删除元素
   * @param index 元素
   * @author coderwujx
   * @returns {T | null} 元素
   */
  public remove(index: number): T | null {
    if (index < 0 || index >= this._length) {
      //位置不合法
      console.log("位置不合法!");
      return null;
    }
    let current = this.head; // 从链表头部开始遍历
    let previous: LinkedListNode<T> | null = null; // 记录当前节点的前一个节点
    let currentIndex = 0;
    while (currentIndex++ < index && current !== null) {
      previous = current; // 将当前节点赋值给 previous
      current = current.next; // 将当前节点指向下一个节点
    }
    if (previous === null) {
      // 如果要删除的节点是头节点，则将头节点指向下一个节点
      this.head = current?.next || null;
    }
    previous!.next = current?.next || null; // 将 previous 的 next 指向当前节点的下一个节点
    this._length--;
    return current?.element || null; // 返回当前节点的元素
  }
  /**
   * @description 删除头节点
   * @author coderwujx
   * @returns {T | null} 元素
   */
  public removeHead(): T | null {
    return this.remove(0);
  }
  /**
   * @description 删除尾节点
   * @author coderwujx
   * @returns {T | null} 元素
   */
  public removeTail(): T | null {
    return this.remove(this._length - 1);
  }

  /**
   * @description 删除第一个匹配值的节点
   * @param element 元素
   * @author coderwujx
   * @returns {T | null} 元素
   */
  public removeByValue(element: T): T | null {
    const index = this.indexOf(element);
    return this.remove(index);
  }
  /**
   * @description 查找是否存在某个值
   * @param element 元素
   * @author coderwujx
   * @returns {boolean} 是否存在
   */
  public contains(element: T): boolean {
    return this.indexOf(element) !== -1;
  }
  /**
   * @description 清空链表
   * @author coderwujx
   */
  public destroy(): void {
    this.head = null; // 将头节点置为 null
    this._length = 0; // 将链表长度置为 0
  }
}


```

### 双向链表

```ts

```
