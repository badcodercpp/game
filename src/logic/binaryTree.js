

class SyncExecutor {
    constructor(type){
        this._type=type;
        this._status=false;
    }
    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    executeInSync(...f){
        for (const x of f) {
            console.log(x.native)
            if (this.isFunction(x.native)) {
                this._status=true;
                x.native.call(x.arguments)
            }else{
                throw new Error("this can only executes a functions")
            }
        }
    }
}

let s=new SyncExecutor("sync")
let f1=(a)=>{
    console.log(a)
}
let f2=(a)=>{
    console.log(a)
}
let f3=(a)=>{
    console.log(a)
}

let oo1={};


let o1={
    native:f1,
    arguments:1
}
let o2={
    native:f2,
    arguments:2
}
let o3={
    native:f3,
    arguments:3
}

let array=[]




s.executeInSync(o1,o2,o3)