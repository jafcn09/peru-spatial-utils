CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -O2 -Iinclude
LDLIBS ?= -lm

SRC := $(wildcard src/*.c)
OBJ := $(SRC:.c=.o)

BUILD := build
TEST_BIN := $(BUILD)/test_psu
LIB := $(BUILD)/libpsu.a

.PHONY: all data test clean

all: $(LIB)

data:
	node scripts/generate-data.mjs

$(LIB): $(OBJ) | $(BUILD)
	ar rcs $@ $(OBJ)

$(BUILD):
	mkdir -p $(BUILD)

$(TEST_BIN): test/test_psu.c $(LIB) | $(BUILD)
	$(CC) $(CFLAGS) test/test_psu.c $(LIB) $(LDLIBS) -o $@

test: $(TEST_BIN)
	./$(TEST_BIN)

clean:
	rm -f $(OBJ)
	rm -rf $(BUILD)
