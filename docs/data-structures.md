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
