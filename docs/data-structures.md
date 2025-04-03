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
export class SqList<T> {
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

```ts
/**
 * 链表节点
 * @template T 节点数据类型
 * @description 链表的基本构建单元，包含数据和指向下一节点的指针
 * @author coderwujx
 */
class ListNode<T> {
  value: T; //节点数据
  next: ListNode<T> | null; //下一个节点

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

/**
 * 链表
 * @description 单向链表实现，提供基本的链表操作
 * @template T 链表元素类型
 * @author coderwujx
 */
class LinkedList<T> {
  private head: ListNode<T> | null; // 链表头节点指针
  private _length: number; // 链表中节点的数量

  /**
   * 初始化空链表
   * @description 创建一个空链表，头节点为null，长度为0
   */
  constructor() {
    this.head = null;
    this._length = 0;
  }

  /**
   * 链表长度
   * @returns {number} 链表中节点的数量
   * @description 获取链表中节点的数量
   */
  get length(): number {
    return this._length;
  }

  /**
   * @description 在链表尾部添加元素
   * @param value 要添加的值
   */
  append(value: T): void {
    const newNode = new ListNode(value); // 创建新节点

    if (!this.head) {
      this.head = newNode; // 如果链表为空，则新节点为头节点
    } else {
      let current = this.head; // 从头部开始遍历
      while (current.next) {
        current = current.next; // 移动到下一个节点
      }
      current.next = newNode; // 将最后一个节点的next指向新节点
    }
    this._length++; // 链表长度加1
  }

  /**
   * @description 在链表头部添加元素
   * @param value 要添加的值
   */
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this._length++;
  }

  /**
   *  @description 在指定位置插入元素
   * @param value 要插入的值
   * @param position 插入位置
   * @returns {boolean} 是否插入成功
   */
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this._length) return false; // 检查位置是否有效

    if (position === 0) {
      this.prepend(value); // 在头部插入
      return true;
    }

    if (position === this._length) {
      this.append(value); // 在尾部插入
      return true;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    let previous: ListNode<T> | null = null; // 用于记录前一个节点
    let index = 0;

    while (index++ < position) {
      previous = current;
      current = current!.next; // 移动到指定位置
    }

    newNode.next = current;
    previous!.next = newNode; // 将前一个节点的next指向新节点
    this._length++;
    return true;
  }

  /**
   * @description 删除指定位置的元素
   * @param position 删除位置
   * @returns {T | null} 删除的元素值，如果位置无效则返回null
   */
  removeAt(position: number): T | null {
    if (position < 0 || position >= this._length) return null; // 检查位置是否有效

    let current = this.head; // 从头节点开始遍历
    if (position === 0) {
      this.head = current!.next;
    } else {
      let previous: ListNode<T> | null = null; // 用于记录前一个节点
      let index = 0; // 记录当前位置

      while (index++ < position) {
        previous = current; // 移动到指定位置
        current = current!.next; // 移动到指定位置
      }
      previous!.next = current!.next; // 将前一个节点的next指向当前节点的next
    }

    this._length--; // 链表长度减1
    return current!.value; // 返回删除的元素值
  }

  /**
   * @description 删除指定元素
   * @param value 要删除的值
   * @returns {boolean} 是否删除成功
   */
  remove(value: T): boolean {
    const index = this.indexOf(value); // 获取元素索引
    if (index === -1) return false; // 如果索引为-1，则元素不存在
    this.removeAt(index); // 删除元素
    return true;
  }

  /**
   * @description 查找元素位置
   * @param value 要查找的值
   * @returns {number} 元素索引，不存在返回-1
   */
  indexOf(value: T): number {
    let current = this.head; // 从头节点开始遍历
    let index = 0;

    while (current) {
      if (current.value === value) {
        // 如果找到匹配的值
        return index;
      }
      current = current.next; // 移动到下一个节点
      index++;
    }

    return -1;
  }

  /**
   * @description 判断是否包含元素
   * @param value 要查找的值
   * @returns {boolean} 是否包含该元素
   */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1; // 调用indexOf方法判断是否存在
  }

  /**
   * @description 获取指定位置的元素
   * @param position 位置索引
   * @returns {T | null} 元素值，如果位置无效则返回null
   */
  get(position: number): T | null {
    if (position < 0 || position >= this._length) return null; // 检查位置是否有效

    let current = this.head; // 从头节点开始遍历
    let index = 0;

    while (index++ < position) {
      current = current!.next; // 移动到指定位置
    }

    return current!.value;
  }

  /**
   * @description 清空链表
   */
  clear(): void {
    this.head = null; // 将头节点置为null
    this._length = 0; // 将链表长度置为0
  }

  /**
   * @description 转换为数组
   * @returns {T[]} 包含链表所有元素的数组
   */
  toArray(): T[] {
    const result: T[] = []; // 用于存储链表元素的数组
    let current = this.head; // 从头节点开始遍历

    while (current) {
      result.push(current.value); // 将当前节点的值添加到结果数组中
      current = current.next; // 移动到下一个节点
    }

    return result;
  }

  /**
   * @description 遍历链表
   * @param callback 回调函数，接收节点值和索引作为参数
   */
  traverse(callback: (value: T, index: number) => void): void {
    let current = this.head; // 从头节点开始遍历
    let index = 0;

    while (current) {
      callback(current.value, index++); // 调用回调函数处理当前节点的值和索引
      current = current.next; // 移动到下一个节点
    }
  }
}

```
