import winston from "winston";

const formatconfig =  winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.simple(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.errors({ stack: true }),
);

const createLog = (filename, level) =>{
    return winston.createLogger({
        transports: [
            new winston.transports.File({
            filename: `logs/${filename}.log`,
            level: level,
            format: formatconfig,
            })
        ]
    });
}

const errorLogger = createLog('error', 'error')

const infoLogger = createLog('info', 'info')

const newCategoryLogger = createLog('newCategories', 'warn')

const logger = {
    info:(log)=>{
        return infoLogger.info(log)
    },
    error:(log)=>{
        return errorLogger.error(log)
    },
    newCategory:(log)=>{
        return newCategoryLogger.warn(log)
    }
}

export default logger