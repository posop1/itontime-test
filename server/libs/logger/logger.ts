/* eslint-disable no-undef */
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
	timestamp: pino.stdTimeFunctions.isoTime,
	transport: {
		targets: [
			{
				target: "pino-pretty"
			}
		]
	}
});

export const httpLogger = pinoHttp();
