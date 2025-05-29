import { Model, Sequelize } from 'sequelize-typescript';
import { AuditTrail } from './entity/audit-trail.entity';

const ignoreModels = ['Log', 'AuditTrail'];

export function addAuditTrailHook(sequelize: Sequelize) {
  sequelize.addHook('beforeBulkCreate', async (options: any) => {
    if (!options.model) return;
    if (ignoreModels.includes(options.model.name)) {
      return;
    } else {
      if (
        !options.individualHooks &&
        !options.model.disableAutoHistoryIndividualHook
      ) {
        options.individualHooks = true;
      }
    }
  });

  sequelize.addHook('beforeBulkUpdate', async (options: any) => {
    if (!options.model) return;
    if (ignoreModels.includes(options.model.name)) {
      return;
    } else {
      if (
        !options.individualHooks &&
        !options.model.disableAutoHistoryIndividualHook
      ) {
        options.individualHooks = true;
      }
    }
  });

  sequelize.addHook('beforeBulkDestroy', async (options: any) => {
    if (!options.model) return;
    if (ignoreModels.includes(options.model.name)) {
      return;
    } else {
      if (
        !options.individualHooks &&
        !options.model.disableAutoHistoryIndividualHook
      ) {
        options.individualHooks = true;
      }
    }
  });

  sequelize.addHook('afterCreate', async (instance: Model) => {
    if (!instance.constructor) return;
    if (ignoreModels.includes(instance.constructor.name)) {
      return;
    } else {
      await AuditTrail.create({
        table: instance.constructor.name,
        rowId: instance.id,
        action: 'create',
        current_data: instance.dataValues,
        previous_data: null,
      } as AuditTrail);
    }
  });

  sequelize.addHook('beforeUpdate', async (instance: Model) => {
    if (!instance.constructor) return;
    if (ignoreModels.includes(instance.constructor.name)) {
      return;
    } else {
      await AuditTrail.create({
        table: instance.constructor.name,
        rowId: instance.id,
        action: 'update',
        current_data: instance.dataValues,
        previous_data: (instance as any)._previousDataValues,
      } as AuditTrail);
    }
  });

  sequelize.addHook('beforeDestroy', async (instance: Model) => {
    if (!instance.constructor) return;
    if (ignoreModels.includes(instance.constructor.name)) {
      return;
    } else {
      await AuditTrail.create({
        table: instance.constructor.name,
        rowId: instance.id,
        action: 'delete',
        current_data: null,
        previous_data: instance.dataValues,
      } as AuditTrail);
    }
  });
}
