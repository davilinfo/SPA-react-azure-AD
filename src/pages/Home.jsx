import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { Container } from "react-bootstrap";
import { IdTokenData } from "../components/DataDisplay";
import ComponentUI from "../components/ComponentUI";
import { useState } from "react";


/***
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */
export const Home = () => {
    const [atualiza, setAtualiza] = useState(0);
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    return (
        <>
            <button onClick={()=>{ setAtualiza(atualiza + 1) }}> Atualiza </button>
            <ComponentUI valeu={atualiza}></ComponentUI>
            <AuthenticatedTemplate>
                {
                    activeAccount ?
                        <Container>
                            <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
                        </Container>
                        :
                        null
                }
            </AuthenticatedTemplate>
        </>
    );
}
