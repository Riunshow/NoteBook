/**
 * @description 用链表实现队列
 */

interface IListNode {
    value: number
    next: IListNode | null
}

class MyQueue {
    private head: IListNode | null = null
    private tail: IListNode | null = null
    private len = 0
    
}