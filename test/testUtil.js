import crypto from 'crypto'
import { assert } from 'chai'

// use the crypto module to create a sha256 hash from the data passed in
export function sha256(data) {
    return crypto.createHash('sha256').update(data).digest();
}

// the concat function we use to hash together merkle leaves
export function concatHash(left, right) {
    if (!left) throw new Error("The concat function expects two hash arguments, the first was not received.");
    if (!right) throw new Error("The concat function expects two hash arguments, the second was not received.");
    return sha256(Buffer.concat([left, right]));
}

// the concat function we use to show the merkle root calculation
export function concatLetters(left, right) {
    return `Hash(${left} + ${right})`;
}

// given a proof, finds the merkle root
export function hashProof(node, proof) {
    let data = sha256(node);
    for (let i = 0; i < proof.length; i++) {
        const buffers = (proof[i].left) ? [proof[i].data, data] : [data, proof[i].data];
        data = sha256(Buffer.concat(buffers));
    }
    return data;
}

