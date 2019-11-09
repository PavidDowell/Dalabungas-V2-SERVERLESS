const perf_now = require ("performance-now");
/**
 * Generate UUID V4 with some form of entropy increased from using MATH.RANDOM
 */
export const generateUUID = () => {
    let entropyStamp : number; // our rng , tries to make itself more random using date and possibly performance time stamp
    let randomValue : number ; // the random value generated for the sequence
    entropyStamp  = new Date().getTime(); // timestamp ms
    entropyStamp += perf_now();

    // we're only concerned wtih replacing x and y values
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace (/[xy]/g, function (letter : string) 
    {
        // give us a random value with an entropy stamp 
        randomValue  = (entropyStamp + Math.random() * 16) % 16 | 0;
        // convert our entropy stamp to the nearest whole number
        entropyStamp = Math.floor(entropyStamp / 16);
        // for x letters --> replace them with the radnom value 
        // for y letters -->  they can exist as [8,9,A,B] as per UUID_V4 SPEC
        return (letter === "x" ? randomValue : (randomValue & 0x3 | 0x8)).toString(16);
    });
}

