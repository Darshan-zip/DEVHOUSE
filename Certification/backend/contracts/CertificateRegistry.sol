// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string certName;
        string issuer;
        uint256 issuedAt;
        bool isEcoFriendly;
        bool exists;
    }

    mapping(bytes32 => Certificate) public certificates;

    /// Register a new eco-friendly certificate
    function registerCertificate(
        bytes32 certHash,
        string memory certName,
        string memory issuer,
        bool isEcoFriendly
    ) public {
        require(!certificates[certHash].exists, "Certificate already registered");

        certificates[certHash] = Certificate({
            certName: certName,
            issuer: issuer,
            issuedAt: block.timestamp,
            isEcoFriendly: isEcoFriendly,
            exists: true
        });
    }

    /// Check if a certificate is registered
    function isRegistered(bytes32 certHash) public view returns (bool) {
        return certificates[certHash].exists;
    }

    /// Check if a certificate is eco-friendly
    function isEcoFriendlyCertificate(bytes32 certHash) public view returns (bool) {
        require(certificates[certHash].exists, "Certificate not found");
        return certificates[certHash].isEcoFriendly;
    }

    /// Get full details of the certificate
    function getCertificateDetails(bytes32 certHash) public view returns (
        string memory certName,
        string memory issuer,
        uint256 issuedAt,
        bool isEcoFriendly
    ) {
        require(certificates[certHash].exists, "Certificate not found");

        Certificate memory cert = certificates[certHash];
        return (cert.certName, cert.issuer, cert.issuedAt, cert.isEcoFriendly);
    }
}
