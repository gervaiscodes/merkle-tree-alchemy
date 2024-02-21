export function verifyProof(proof, node, root, concat) {
    let ownRoot = node

    for (let proofEl of proof) {
        if(proofEl.left) {
          ownRoot = concat(proofEl.data, ownRoot)
        } else {
          ownRoot = concat(ownRoot, proofEl.data)
        }
    }

    return ownRoot === root
}
