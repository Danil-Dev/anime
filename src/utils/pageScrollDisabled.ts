

export default function pageScrollDisabled(disabled: boolean) {
    if (disabled){
        document.body.style.height='100vh'
        document.body.style.overflow='hidden'
    }
    else {
        document.body.style.height='auto'
        document.body.style.overflow='auto'
    }
}