module.exports = {
    getConviction: (a, D, y0, x, t) => {



        //        const t1 = t + 1;
        // const c = i => Math.floor(i);
        if (t === 0) {
            return 0;
        }
        let y = y0 + (x - y0) * (1 - 1 / (1 + (t / (10 * a)))); //+ y0 * Math.log(1-y0/x);

        console.log(`y=${y} where y0=${y0} x=${x} t=${t}`)


        //  let y = y0 * a ** t + (x * (1 - a ** t)) / (1 - a);
        // i believe this should be 
        //let y = y0 * a + x
        // as long as x is the current token amount at time t
        // t should not need to appear in this equation at all

        // Solidity code
        // const aD = c(a * D);
        // const Dt = c(D ** t);
        // const aDt = c(aD ** t);
        // const term1 = c(aDt * y0);
        // const term2 = c(x * D * c(Dt - aDt)) / c(D - aD);
        // const ySOL = c((term1 + term2) / Dt);
        // const diff = 100 * (y / ySOL - 1);

        return y;
    }
};
