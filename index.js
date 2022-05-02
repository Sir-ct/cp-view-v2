async function main(){
    let combdata = []
    let biku = []
    let v2biku = []
    let biga = []
    let v2biga = []
    let biby = []
    let v2biby = []
    let kuga = []
    let v2kuga = []
    let kuby = []
    let v2kuby = []
    let gaby = []
    let v2gaby = []
    let usable = []
    let v2usable = []
    let v2usableobj = {}
    //let v2usableobj = {}
    let usdt = /USDT/
    let table = document.getElementById("table")


    let proxy = "https://proxy-t1-server1.herokuapp.com"

    let prev = document.getElementById("prev")
    let next = document.getElementById("next")

    let startindex = 0
    let numperpage = 500




          //fetch binance data
          let binance = await fetch(proxy).catch(err=>{
            table.innerText = "connection error: try refreshing page"
          })
          let binancedata = await binance.json()
          let bindata = []
             for(let i=0; i < binancedata.length; i++){
                 if(usdt.test(binancedata[i].symbol)){
                     combdata.push(binancedata[i])
                     bindata.push(binancedata[i])
                 }
             }
             console.log(bindata)
 

    

        //fetch kucoin data
    let kucoin = await fetch(proxy+"/kucoin").catch(err=>{
        table.innerText = "connection error: try refreshing page"
    })
    let kucoindata = await kucoin.json()
    let kudata = []
        console.log("kucoin: ", kucoindata.data.ticker)
        for(let i=0; i < kucoindata.data.ticker.length; i++){
            if(usdt.test(kucoindata.data.ticker[i].symbol)){
                combdata.push(kucoindata.data.ticker[i])
                kudata.push(kucoindata.data.ticker[i])
            }
        }
        console.log(kudata)


         //fetch gateio data
    let gateio = await fetch(proxy+"/gateio").catch(err=>{
        table.innerText = "connection error: try refreshing page"
        return
    })
    let gateiodata = await gateio.json()
    let gadata = []
    console.log("gateio: ", gateiodata)
        for(let i=0; i < gateiodata.length; i++){
            if(usdt.test(gateiodata[i]["currency_pair"])){
            combdata.push(gateiodata[i])
            gadata.push(gateiodata[i])
            }
        }
   console.log(gadata)

    //fetch bybit data
    let bybit = await fetch(proxy+"/bybit").catch((err)=>{
            table.innerText = "connection error: try refreshing page"
        
    })
    let bybitdata = await bybit.json()
    let bydata = []
            console.log("bybit: ", bybitdata)
        for(let i=0; i < bybitdata.result.length; i++){
            if(usdt.test(bybitdata.result[i].symbol)){
                combdata.push(bybitdata.result[i])
                bydata.push(bybitdata.result[i])
            }
        }
        console.log(bydata)
 
        //comparing binance to all (kucoin, gateio, bybit) in this order by
        // adding all currency pairs that also appear in them to the binance array as a new array
      //1 bi-ku
        for(let i=0; i<bindata.length; i++){
            for(let j=0; j<kudata.length; j++){
                if(bindata[i].symbol == kudata[j].symbol.replace(/-/, "")){
                    biku.push(bindata[i])
                    biku.push(kudata[j])

                     v2usableobj = { // v2 code starts here
                        symbol: bindata[i].symbol,
                        bina: bindata[i].lastPrice,
                        kuco: kudata[j].last
                    }

                   v2biku.push(v2usableobj)
                }


                 
            }
        }
        console.log(v2usableobj)
        console.log(v2usable)
        //2 bi-ga
        for(let i=0; i<bindata.length; i++){
            for(let j=0; j<gadata.length; j++){
                if(bindata[i].symbol == gadata[j]["currency_pair"].replace(/_/, "")){
                    biga.push(bindata[i])
                    biga.push(gadata[j])
   
                     v2usableobj = { // v2 code starts here
                        symbol: bindata[i].symbol,
                        bina: bindata[i].lastPrice,
                        gate: gadata[j].last
                    }
    
                    v2biga.push(v2usableobj)
                }
             
                  
            }
        }
        console.log(v2usableobj)
        console.log(v2usable)
        //3 bi-by
        for(let i=0; i<bindata.length; i++){
            for(let j=0; j<bydata.length; j++){
                if(bindata[i].symbol == bydata[j].symbol){
                    biby.push(bindata[i])
                    biby.push(bydata[j])
                    
                 v2usableobj = { // v2 code starts here
                    symbol: bindata[i].symbol,
                    bina: bindata[i].lastPrice,
                    bybi: bydata[j].last_price
                }

                v2biby.push(v2usableobj)
                }

                  
            }
        }
        
        //comparing kucoin to the rest
        //4 ku-ga
        for(let i=0; i<kudata.length; i++){
            for(let j=0; j<gadata.length; j++){
                if(kudata[i].symbol.replace(/-/, "") == gadata[j]["currency_pair"].replace(/_/, "")){
                    kuga.push(kudata[i])
                    kuga.push(gadata[j])
                                    
                 v2usableobj = { // v2 code starts here
                    symbol: kudata[i].symbol.replace(/-/, ""),
                    kuco: kudata[i].last,
                    gate: gadata[j].last
                }

                v2kuga.push(v2usableobj)

                }

                  
            }
        }

        //5 ku-by
        for(let i=0; i<kudata.length; i++){
            for(let j=0; j<bydata.length; j++){
                if(kudata[i].symbol.replace(/-/, "") == bydata[j].symbol){
                    kuby.push(kudata[i])
                    kuby.push(bydata[j])

                    
                 v2usableobj = { // v2 code starts here
                    symbol: kudata[i].symbol.replace(/-/, ""),
                    kuco: kudata[i].last,
                    bybi: bydata[j].last_price
                }

              v2kuby.push(v2usableobj)
                }

            
            }
        }
        console.log(v2usableobj)
        console.log(v2usable)
        // comparing gateio to the rest
        //6 ga-by
        for(let i=0; i<gadata.length; i++){
            for(let j=0; j<bydata.length; j++){
                if(gadata[i]["currency_pair"].replace(/_/, "") == bydata[j].symbol){
                    gaby.push(gadata[i])
                    gaby.push(bydata[j])

                                  
                 v2usableobj = { // v2 code starts here
                    symbol: gadata[i]["currency_pair"].replace(/_/, ""),
                    gate: gadata[i].last,
                    bybi: bydata[j].last_price
                }

              v2gaby.push(v2usableobj)
                }
            }
                  
        }

        console.log(v2usableobj)
        console.log(v2usable)

      
     // merging all in one array
     for(let i=0; i<v2biku.length; i++){
        v2usable.push(v2biku[i])
    }
    for(let i=0; i<v2biga.length; i++){
        v2usable.push(v2biga[i])
    }
    for(let i=0; i<v2biby.length; i++){
        v2usable.push(v2biby[i])
    }
    for(let i=0; i<v2kuga.length; i++){
        v2usable.push(v2kuga[i])
    }
    for(let i=0; i<v2kuby.length; i++){
        v2usable.push(v2kuby[i])
    }
    for(let i=0; i<v2gaby.length; i++){
        v2usable.push(v2gaby[i])
    } 
   


        v2usable.sort((a, b) => {
            let fa = a.symbol,
                fb = b.symbol;
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        
        let duplicate  = v2usable //using a duplicate to iterate and complete the objects 
        
        for(let i=0; i<v2usable.length; i++){
           for(let j=0; j<duplicate.length; j++){
            if(duplicate[j].symbol == v2usable[i].symbol){

              if(duplicate[j].bina && !v2usable[i].bina){
                  v2usable[i].bina = duplicate[j].bina
              }
              if(duplicate[j].kuco && !v2usable[i].kuco){
                  
                  v2usable[i].kuco = duplicate[j].kuco
              }
              if(duplicate[j].gate && !v2usable[i].gate){
                v2usable[i].gate = duplicate[j].gate
              }
              if(duplicate[j].bybi && !v2usable[i].bybi){
                  v2usable[i].bybi = duplicate[j].bybi
              }
    
            }
           }
        }

        //filtering the array after duplicates
        const filtered = v2usable.reduce((acc, current) => {
            const x = acc.find(item => item.symbol === current.symbol);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

       
           

     

    console.log("binance-kucoin", v2biku)
    console.log("binance-gateio", v2biga)
    console.log("binance-bybit", v2biby)
    console.log("kucoin-gateio", v2kuga)
    console.log("kucoin-bybit", v2kuby)
    console.log("gateio-bybit", v2gaby) 
    //console.log(usable)
    console.log(v2usable)
    console.log(filtered)
        
    renderPage(filtered, startindex, numperpage)

    prev.addEventListener("click", ()=>{
        if(startindex > 0){
            
            table.innerText = "loading previous page"

            startindex -= 500
            numperpage -= 500

            console.log(startindex, numperpage)
            renderPage(filtered, startindex, numperpage)
        }
    })

    next.addEventListener("click", ()=>{
        if(startindex < filtered.length){
            table.innerText = "loading next page"

            startindex += 500
            numperpage += 500

            console.log(startindex, numperpage)
            renderPage(filtered, startindex, numperpage)
        }
    })
}

function renderPage(data, startindex, numperpage){
    let table = document.getElementById("table")
    
    table.innerHTML = ""

    for(let i=startindex; i<numperpage; i++){
        table.innerHTML += `
        <div class="row">
        <div class="left">
         <div class="symbol">${data[i].symbol}</div>
        </div>
        <div class="right">
         <div class="exchange">Binance: $ ${ data[i].bina ? data[i].bina : ""}</div>
         <div class="exchange">kucoin: $ ${data[i].kuco ? data[i].kuco : ""}</div>
         <div class="exchange">Gateio: $ ${data[i].gate ? data[i].gate : ""}</div>
         <div class="exchange">Bybit: $ ${ data[i].bybi ? data[i].bybi: ""}</div>
        </div>
     </div>
        `
      }

      console.log("done")

}

window.addEventListener("load", main) 