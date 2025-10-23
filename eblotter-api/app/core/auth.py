from fastapi import Security
from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from app.core.config import settings


# Azure AD Authentication
azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=settings.AZURE_CLIENT_ID,
    tenant_id=settings.AZURE_TENANT_ID,
    scopes={
        f'api://{settings.AZURE_CLIENT_ID}/user_impersonation': 'User impersonation',
    },
    allow_guest_users=True,
)


async def get_current_user(
    user=Security(azure_scheme, scopes=['user_impersonation'])
):
    """
    Dependency to get the current authenticated user.

    Usage:
        @app.get("/protected")
        async def protected_route(user = Depends(get_current_user)):
            return {"user": user}
    """
    return user
