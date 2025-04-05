// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CertVerifier {
    mapping(bytes32 => bool) public certifiedDocs;

    event DocumentCertified(bytes32 indexed hash);

    function certifyDocument(bytes32 docHash) public {
        certifiedDocs[docHash] = true;
        emit DocumentCertified(docHash);
    }

    function verifyDocument(bytes32 docHash) public view returns (bool) {
        return certifiedDocs[docHash];
    }
}
