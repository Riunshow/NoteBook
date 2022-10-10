class Throttle {
    public use(fn: Function, delay: number = 100) {
        let timer: NodeJS.Timeout | null

        return (...args: any) => {
            if (timer) return

            timer = setTimeout(() => {
                fn.call(this, args)
                timer = null
            }, delay)
        }
    }
}