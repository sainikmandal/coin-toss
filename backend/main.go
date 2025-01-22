package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type Response struct {
    Result string `json:"result"`
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "*")
        w.Header().Set("Access-Control-Allow-Credentials", "true")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        next(w, r)
    }
}

func coinTossHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    rand.Seed(time.Now().UnixNano())
    result := "heads"
    if rand.Float32() < 0.5 {
        result = "tails"
    }

    json.NewEncoder(w).Encode(Response{Result: result})
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.NotFound(w, r)
        return
    }
    w.Header().Set("Content-Type", "text/plain")
    w.Write([]byte("Coin Toss API is running. Use /api/toss to get a coin toss result."))
}

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    // Root route handler
    http.HandleFunc("/", rootHandler)

    // API routes
    http.HandleFunc("/api/toss", enableCORS(coinTossHandler))

    log.Printf("Starting server on port %s\n", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}
