import 'reflect-metadata';
import dotenv from 'dotenv';
import '@core/Scope';
import OryxBoot from '@core/Boot';

/** packages initialize */
dotenv.config();

/** run the server */
OryxBoot.start();
