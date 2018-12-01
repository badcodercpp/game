export class Logic {
    create_logic=(nR,nC)=>{
        alert(nR)
        this._nR=Number(nR);
        this._nC=Number(nC);
        let totalM=nR;
        let arr=new Array(nR);
        arr.length=nR;
        let pos=[]
        for(let i=0;i<nR;i++){
            arr[i]=new Array(nC)
        }
        while(totalM>0){
            let n_1=this.returnRandomPlace(1,nR-1);
            let n_2=this.returnRandomPlace(1,nC-1);
            // next line is just used to create view pushed 1 as food elements to array
            arr[n_1][n_2]=1;
            totalM=totalM-1;
            pos.push([n_1,n_2])
        }

        // next for loop is just used to create view pushed 0 as dummy elements to array

        for (let i1=0;i1<arr.length;i1++) {
            for (let i2=0;i2<arr[i1].length;i2++) {
                console.log(typeof arr[i1][i2]==='undefined')
                if(typeof arr[i1][i2]==='undefined'){
                    arr[i1][i2]=0
                }else{
                    
                }
            }
        }
        return {arr:arr,pos:pos};
    }
    eatAllFood=(arr)=>{
        let path="";
        let tmp=this._nR;
        let allLength=0;
        //debugger;
        for(let i1=0;i1<this._nR;i1++){
            
            for (let i2 = 0; i2 < this._nC; i2++) {
                if(arr[i1][i2]!==0){
                    arr[i1][i2]=0;
                    tmp=tmp-1;
                    if (tmp===0) {
                        break;
                    }   
                }
                path=path+`(${i1},${i2})  ==>  `
                allLength=allLength+1
            }
            if(tmp===0){
                break;
            }
        }
        return {
            length:allLength,
            board:arr,
            path:path
        }
    }
    // please ignore this method this was used just for testing purpose
    logger=(data)=>{
        console.log("logger=========================")
        console.log(data)
        console.log("logger=========================")
    }
    returnRandomPlace=(min,max)=>{
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    // please ignore this method this was used just for testing purpose
    init(){
        let nr=10;
        let nc=10;
        let ret=this.create_logic(nr,nc)
        this.logger(ret)
    }
}