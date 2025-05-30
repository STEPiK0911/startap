// FavoritesPage.tsx
import React, { useState } from "react";
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Rating,
  TextField, InputAdornment, IconButton, Chip, Divider, Button, Stack,
  Avatar, useTheme, Popover, Slider
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  Share as ShareIcon,
  Directions as DirectionsIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useFavorites } from "./FavoritesContext"; // путь подгони под себя

const FavoritesPage = () => {
  const theme = useTheme();
  const { favorites, toggleFavorite } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [ratingFilter, setRatingFilter] = useState<[number, number]>([0, 5]);
  const [appliedRatingFilter, setAppliedRatingFilter] = useState<[number, number]>([0, 5]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleRatingChange = (event: Event, newValue: number | number[]) => setRatingFilter(newValue as [number, number]);
  const handleApplyFilters = () => {
    setAppliedRatingFilter(ratingFilter);
    handleFilterClose();
  };
  const resetFilters = () => setRatingFilter([0, 5]);
  const toggleSortDirection = () => setSortDirection(sortDirection === "desc" ? "asc" : "desc");

  const filteredFavorites = favorites
      .filter((place) => {
        const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRating = place.rating >= appliedRatingFilter[0] && place.rating <= appliedRatingFilter[1];

        return matchesSearch && matchesRating;
      })
      .sort((a, b) => sortDirection === "desc" ? b.rating - a.rating : a.rating - b.rating);

  return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="white">
            Избранные места
          </Typography>
          <Typography variant="subtitle1" color="white">
            {filteredFavorites.length} сохранённых мест
          </Typography>
        </Stack>

        <Paper sx={{ p: 3, mb: 4, background: "white" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Поиск по избранному..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                  }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button fullWidth variant="outlined" startIcon={<FilterIcon />} onClick={handleFilterClick}>
                Фильтры
              </Button>
              <Popover
                  open={Boolean(filterAnchorEl)}
                  anchorEl={filterAnchorEl}
                  onClose={handleFilterClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Box sx={{ p: 2, minWidth: 300 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Фильтры</Typography>
                    <IconButton onClick={handleFilterClose}><CloseIcon /></IconButton>
                  </Stack>
                  <Typography gutterBottom>Рейтинг</Typography>
                  <Slider
                      value={ratingFilter}
                      onChange={handleRatingChange}
                      valueLabelDisplay="auto"
                      min={0} max={5} step={0.1}
                  />
                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Button onClick={resetFilters}>Сбросить</Button>
                    <Button variant="contained" onClick={handleApplyFilters}>Применить</Button>
                  </Stack>
                </Box>
              </Popover>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button fullWidth variant="contained" onClick={toggleSortDirection} startIcon={<StarIcon />} endIcon={sortDirection === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}>
                По рейтингу
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {filteredFavorites.length === 0 ? (
            <Typography variant="h6" color="text.secondary" textAlign="center">
              {searchQuery ? "Ничего не найдено" : "Список избранного пуст"}
            </Typography>
        ) : (
            <Grid container spacing={3}>
              {filteredFavorites.map((place) => (
                  <Grid item xs={12} sm={6} lg={4} key={place.id}>
                    <Card>
                      <Box position="relative">
                        <CardMedia component="img" height="200" image={place.image} alt={place.title} />
                        <IconButton
                            onClick={() => toggleFavorite(place.id)}
                            sx={{ position: "absolute", top: 8, right: 8, background: "white" }}
                        >
                          <FavoriteIcon color="error" />
                        </IconButton>
                        <Chip label={place.category} size="small" sx={{ position: "absolute", bottom: 8, left: 8 }} />
                      </Box>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">{place.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{place.description}</Typography>
                        <Box mt={1} display="flex" alignItems="center">
                          <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">{place.location}</Typography>
                        </Box>
                        <Box mt={1} display="flex" alignItems="center">
                          <Rating value={place.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" ml={1}>{place.rating.toFixed(1)}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
        )}
      </Box>
  );
};

export default FavoritesPage;