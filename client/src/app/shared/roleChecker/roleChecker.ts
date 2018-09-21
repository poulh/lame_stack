import { RegisteredUserApi } from '../../../../sdk';

export class RoleChecker {
    public static ADMIN = "admin";

    private roles: { [key: string]: boolean; } = {};

    constructor(private registeredUserApi: RegisteredUserApi) {
    }

    is(name: string): boolean {
        let hasRole = this.roles[name];
        if (hasRole == null) {
            hasRole = this.roles[name] = false;
            this.registeredUserApi.hasRole(name).subscribe((has: boolean) => {
                this.roles[name] = has;
            });
        }

        return hasRole;
    }
};

