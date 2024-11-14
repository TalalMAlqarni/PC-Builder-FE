import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button } from '@mui/material';

export default function CompatibilityCheck({ cartList, setIgnoreWarning }) {
    const [message, setMessage] = useState("");
    const [powerMessage, setPowerMessage] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    const initialSpecifications = {
        cpuSocket: "",
        gpuInterface: "",
        pciSlot: "",
        productName: "",
        productType: "",
        ramType: ""
    };

    useEffect(() => {
        const checkCompatibility = async () => {
            const specificationsIfExist = await Promise.all(
                cartList.map((product) =>
                    axios
                        .get(`${process.env.REACT_APP_API_URL}/specifications/product/${product.productId}`)
                        .then((res) => {
                            const specification = res.data;
                            if (specification && Object.keys(specification).length > 0) {
                                const validSpecs = Object.fromEntries(
                                    Object.entries(specification).filter(([key, value]) => value && value.trim() !== "")
                                );
                                if (Object.keys(validSpecs).length > 0) {
                                    return {
                                        productId: product.productId,
                                        productName: product.productName,
                                        specs: validSpecs,
                                    };
                                }
                            }
                            return null;
                        })
                        .catch((err) => {
                            if (err.response?.status !== 404) {
                                console.error("Error fetching specifications:", err);
                            }
                            return null;
                        })
                )
            );
            setIgnoreWarning(specificationsIfExist.length === 0);
            const validSpecifications = specificationsIfExist.filter((s) => s !== null);
            processPowerSpecifications(validSpecifications);
            processSpecifications(validSpecifications);
        };
        checkCompatibility();
    }, [cartList]);

    const processSpecifications = (validSpecifications) => {
        const aggregatedData = [];
        let conflictMessage = "";
        let conflictFound = false;

        validSpecifications.forEach((spec) => {
            const newSpec = {
                productId: spec.productId,
                productName: spec.productName,
                specs: {},
            };
            Object.keys(spec.specs).forEach((key) => {
                if (initialSpecifications.hasOwnProperty(key)) {
                    for (let i = 0; i < aggregatedData.length; i++) {
                        const existingSpec = aggregatedData[i];
                        if (existingSpec.specs[key] && existingSpec.specs[key] !== spec.specs[key]) {
                            conflictFound = true;
                            conflictMessage = `Conflict between ${existingSpec.productName} and ${spec.productName} for ${key}`;
                            break;
                        }
                    }
                    newSpec.specs[key] = spec.specs[key];
                }
            });
            aggregatedData.push(newSpec);
        });
        setMessage(conflictFound ? conflictMessage : "");
    };

    const processPowerSpecifications = (validSpecifications) => {
        let totalPowerConsumption = 0;
        let psuCapacity = 0;
        let psuProductName = "";

        validSpecifications.forEach((spec) => {
            if (spec.specs.hasOwnProperty("powerConsumption")) {
                totalPowerConsumption += parseInt(spec.specs.powerConsumption, 10) || 0;
            }
            if (spec.specs.hasOwnProperty("psu")) {
                psuCapacity = parseInt(spec.specs.psu, 10) || 0;
                psuProductName = spec.productName;
            }
        });
        if (psuCapacity > 0 && totalPowerConsumption > psuCapacity) {
            setPowerMessage(`Warning: Total power consumption (${totalPowerConsumption}W) exceeds PSU capacity (${psuCapacity}W) for ${psuProductName}. Consider upgrading your PSU.`);
        } else {
            setPowerMessage("");
        }
    };


    return (
        <div>
            {((message || powerMessage) && !showDetails) && (
                <Alert severity="warning">
                    {"There is a compatibility issue in the cart. This means some products may not be compatible with each other. If you are confident about your choices, you can ignore this warning. To view specific compatibility issues, click the button below."}
                </Alert>
            )}
            {(!showDetails && (message || powerMessage)) && (
                <>
                    <Button color="warning" onClick={() => setShowDetails(true)}>
                        Show more
                    </Button>
                    <Button color="warning" onClick={() => setIgnoreWarning(true)}>
                        Ignore Warnings
                    </Button>
                </>
            )}
            {showDetails && (
                <>
                    {message && <Alert severity="warning">{message}</Alert>}
                    {powerMessage && <Alert severity="warning">{powerMessage}</Alert>}
                </>
            )}
        </div>
    );
}
