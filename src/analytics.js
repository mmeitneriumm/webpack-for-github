import * as $ from 'jquery'

const createAnalytics = () =>{
    let counter = 0
    let isDestroyed = false

    const listener = () => counter++

    $(document).on('click', listener)

    return {
        destroy(){
            $(document).off('click', listener)
            isDestroyed = true
        },

        getClicks(){
            if (isDestroyed){
                return 'analytics is destroyed'
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()