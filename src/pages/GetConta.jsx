import { useEffect, useState } from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { useMsal } from "@azure/msal-react";

import { loginRequest, protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

const GetContaContent = () => {
    const [contaData, setContaData] = useState(null);
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });

    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();    
    const email = activeAccount.idTokenClaims.email;    

    useEffect(() => {
        if (!contaData) {
            execute("GET", protectedResources.apiTodoList.endpoint + `/GetConta?Email=${email}`).then((response) => {                
                console.log("response", response);
                setContaData(response && response.length > 0 ? response[0].id : null);
                console.log("contaData", contaData);
            }).catch((er)=>{
                console.log("erro fetch", er.message);
            });
        }
    }, [execute,contaData])    

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <> id conta <span color='black'>{contaData}</span> </>;
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const GetConta = () => {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <GetContaContent />
        </MsalAuthenticationTemplate>
    );
};
