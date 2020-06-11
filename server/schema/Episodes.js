cube(`Episodes`, {
  sql: `SELECT * FROM public.episode_views`,
  
  joins: {
    Deaths: {
      relationship: `hasMany`,
      sql: `${Deaths}.season_id = ${Episodes}.season_id and ${Deaths}.episode_in_season_id = ${Episodes}.episode_in_season_id`
    }
  },
  
  measures: {
    views: {
      sql: `views`,
      type: `sum`,
    },
/*
    deathsCount: {
      sql: `${deaths}`,
      type: `sum`,
    }
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
/*
    deaths: {
      sql: `${Deaths}.count`,
      type: `number`,
      subQuery: true,
    }
*/
  }
});
