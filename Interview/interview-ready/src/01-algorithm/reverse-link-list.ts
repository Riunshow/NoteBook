export interface ILinkListNode {
    value: number
    next?: ILinkListNode
}

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
    let prevNode: ILinkListNode | undefined = undefined
    let curNode: ILinkListNode | undefined = undefined
    let nextNode: ILinkListNode | undefined = listNode

    while (nextNode) {
        if (curNode && !prevNode) {
            delete curNode.next
        }

        if (curNode && prevNode) {
            curNode.next = prevNode
        }

        prevNode = curNode
        curNode = nextNode
        nextNode = nextNode.next
    }

    curNode!.next = prevNode

    return curNode!
}

export function createLinkList(arr: number[]): ILinkListNode {
    const length = arr.length

    if (length === 0) throw new Error('arr is empty');
    
    let curNode: ILinkListNode = {
        value: arr[length - 1],
        next: undefined
    }

    if (length === 1) return curNode

    for (let i = length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        }
    }
    
    return curNode
}

const arr = [100, 200, 300, 400, 500]
const list = createLinkList(arr)
console.info('list:', list)

const list1 = reverseLinkList(list)
console.info('list1:', list1)