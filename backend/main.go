package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type CoinTossResponse struct {
    Result string `json:"result"`
}

func coinTossHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    // Generate random result
    rand.Seed(time.Now().UnixNano())
    result := "heads"
    if rand.Float32() < 0.5 {
        result = "tails"
    }

    response := CoinTossResponse{Result: result}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    // Initialize router
    mux := http.NewServeMux()
    mux.HandleFunc("/api/toss", coinTossHandler)

    // Setup CORS
    handler := cors.Default().Handler(mux)

    // Start server
    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", handler); err != nil {
        log.Fatal(err)
    }
}
