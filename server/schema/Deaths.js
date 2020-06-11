cube(`Deaths`, {
  sql: `SELECT * FROM public.deaths`,
/*
  joins: {
    Episodes: {
      relationship: `belongsTo`,
      sql: `${Deaths}.season_id = ${Episodes}.season_id and ${Deaths}.episode_in_season_id = ${Episodes}.episode_in_season_id`
    }
  },
*/

  measures: {
    count: {
      type: `count`,
    },
/*
    views: {
      sql: `${Episodes}.views`,
      type: `number`,
    },
*/
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    season_id: {
      sql: `season_id`,
      type: `number`,
    },
    episode_in_season_id: {
      sql: `episode_in_season_id`,
      type: `number`,
    },
    importance: {
      sql: `importance`,
      type: `number`,
    },
    allegiance: {
      sql: `allegiance`,
      type: `string`,
    },
    method: {
      sql: `method`,
      type: `string`,
    },
    method_cat: {
      sql: `method_cat`,
      type: `string`,
    },
    location: {
      sql: `location`,
      type: `string`,
    },
  }
});
