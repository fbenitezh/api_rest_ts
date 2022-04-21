type GeneralConfig = {
    db:DBConfig,
    aws:AWSConfig
}

type DBConfig = {
    user:string,
    pass:string,
    host:string,
    dbName:string,
    provider:string
}

type AWSConfig = {
    secret_key:string,
    public_key:string
}


export const config:GeneralConfig = {
    db:{
        user:process.env.DB_USER || 'fran',
        pass:process.env.DB_PASS || 'ZAQ12wsx',
        host:process.env.DB_HOST || 'localhost',
        dbName:process.env.DB_NAME || 'api_categories',
        provider:process.env.DB_PROVIDER || 'mysql'
    },
    aws:{
        secret_key:'',
        public_key:''
    }
}