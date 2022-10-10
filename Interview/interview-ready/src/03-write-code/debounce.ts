class Debounced {
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use = (
        func: Function,
        delay: number,
        immediate: boolean = false
    ): Function => {
        let timer: NodeJS.Timeout

        return (...args: any) => {
            if (immediate) {
                func.apply(this, args)
                immediate = false
                return
            }

            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                func.call(this, args)
            }, delay)
        }
    }
}
